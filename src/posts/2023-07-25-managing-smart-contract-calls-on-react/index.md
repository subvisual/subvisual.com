---
highlight: false
path: keeping-your-smart-contract-calls-under-control-with-react-hooks
title: Keeping your smart contract calls under control with react hooks
categories:
  - engineering
author: pedro-oliveira
date: 2023-07-25
cover: blog__keeping_your_smart_contract_calls_under_control_with_react_hooks.jpg
intro: Using custom react hooks to perform smart contract calls
---
When developing a React component, it is common for us developers to include both the logic and markup in the same file. This approach serves the purpose of bootstrapping and containing the scope. It is particularly useful when our goal is to rapidly prototype and test, as it allows us to conveniently write the code without scattering the scope across multiple files.

However, as the application progresses beyond the proof-of-concept stage, this practice can become messy. Components that require additional business logic, beyond state management, need to be carefully managed. It is important to address this issue for istance by separating concerns so we can ensure that each component has a clear and distinct responsibility. This makes it easier to manage and extend the application as it continues to evolve.

When it comes to integrating smart contract calls, the codebase of the component tends to grow significantly. It is crucial to be mindful of separating the logic from the component at this point.

Consider an ERC20 contract as an example, and the `allowance` function as example:

```solidity
contract MyToken is ERC20 {
    (...)

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    (...)
}
```

A simple call to this contract, using [wagmi generated hooks](https://wagmi.sh/cli/getting-started#run-code-generation) for instance, would look something like:

```javascript
const [contractAllowance, setContractAllowance] = useState(0)
const { address: account } = useAccount();
const myTokenContractAddr = "0x..."

const { refetch: refetchAllowance } = useMyTokenAllowance({
  args: [account ?? "0x0", myTokenContractAddr],
  enabled: !!account,
  onSuccess: (data) => {
    setContractAllowance(data);
  },
});

```

If the component needs to incorporate basic contract calls such as `checkAllowance`, `approveAllowance`, and `transferTokens`, its size will grow significantly.

## Using react custom hooks

Fortunately, React provides the flexibility to create custom hooks by using the built-in hooks as building blocks. React [docs](https://legacy.reactjs.org/docs/hooks-custom.html#extracting-a-custom-hook) defines custom hooks in a simple way:

> _A custom Hook is a JavaScript function whose name starts with ”use” and that may call other Hooks._

Consider a basic component as an example:

```javascript
const MyComponent = () => {
  const {address, allowance, approveAllowance } = useMyTokenHook();

  return (
    <div>
      <h1>`Hello ${address}` </h1>
      <p>Allowance for myToken contract is `${allowance}`</p>
      <button onClick={approveAllowance}>Approve +10 myToken allowance</button>
    </div>
  )
}
```

By leveraging those hooks, creating specific hooks based on the contract or function call becomes straightforward:

```javascript
const useMyTokenHook = () => {
  const { address: account } = useAccount();
  const myTokenContractAddr = "0x..."

  const { data: allowance, refetch: refetchAllowance } = useMyTokenAllowance({
    args: [account ?? "0x0", myTokenContractAddr],
    enabled: !!account
  });

  ...

  return { address, allowance, ...}

```

This approach offers improved readability, scalability, and facilitates testing.

Especially when it comes to unit tests, testing both the hook and the component separately and easily mock the hook's output to isolate and test the component. This flexibility ensures thorough testing of the codebase, validating the reliability and functionality of both the hook and the component.

## Testing

Here is a quick and conceptual example on how testing could work with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Jest](https://jestjs.io/).

In a component perspective, the test would mock the hook call and yield a known result and then assert the component is properly getting and rendering that expected result.

```javascript
describe("test component with mock results", () => {
  let mockedData;

  beforeEach(() => {
    mockedTokenHookResult = {address: "0x...", allowance: 10, approveAllowance: ...};
    global.useMyTokenHook.mockResolvedValue(mockedTokenHookResult);
  });

  it("should display mocked data", async () => {
    render(<MyComponent />)
    expect(screen.getByText(`Allowance for myToken contract is 10`)).toBeInTheDocument()
  });
});

```

The hook, in the other hand, is similar, but the mocked call this time is `useMyTokenAllowance` (and other contract calls), in order to assert that it's handling the response properly and setting the internal states accordingly:

```javascript
describe("test hook with mock call", () => {
  let mockedData;

  beforeEach(() => {
    global.useMyTokenAllowance.mockResolvedValue(30);
    global.useAccount.mockResolvedValue("0xABCDEF...")

    (...)
  });

  it("should return data", async () => {
    const { result } = renderHook(() => useMyTokenHook());
    const { allowance, address, ... } = result.current

    await waitFor(() =>
      expect(allowance).toBe(30)
      expect(address).toBe("0xABCDEF...")
    );

  });
});

```

As a final note, it’s important to be intentional and conscious when using hooks to abstract logic:

- Ensure that the output of the hook does not include JSX. If it does, consider creating a separate component instead of a hook.

- Verify that the hook code includes calls to other hooks. If it doesn't, consider creating a regular function instead.

By adhering to these guidelines, maintaining a clear and effective separation of concerns will result in a more modular and reusable code.