---
highlight: true
path: a-look-at-liquity-v2
title: "A Look at Liquity V2: Why the Upgraded Features Matter"
categories:
  - product
author: subvisual
date: 2024-10-30
cover: sbv_thumb_extra.png
intro: Liquity V2 is a bit more than a natural evolution for the protocol. It’s
  a thoughtful upgrade, where some subtle changes lead to great implications for
  builders and users alike. It’s a nod towards a community seeking more control,
  transparency, and efficiency.
---
Liquity V2 is a bit more than a natural evolution for the protocol. It’s a thoughtful upgrade, where some subtle changes lead to great implications for builders and users alike. It’s a nod towards a community seeking more control, transparency, and efficiency.

Liquity V2 supports multiple collateral types like stETH (Lido) and rETH (Rocket Pool), which allows users to go well beyond traditional ETH, with another remarkable change being the introduction of user-set interest rates. Borrowers now have the freedom to define their own rates (within a specific range, set by the protocol, of 0.5 to 1000%), which enables them to better manage costs. Market conditions and personal risk levels will matter, of course, but this design allows users to actively set their own borrowing strategy independently.

Redemption and liquidation mechanisms are also improved, making it easier for users to manage their collateral positions. Trove NFTs are a brand new thing, introduced as a way to represent and track individual collateralized debt.

So, shall we take a look at what kind of impact you can expect on products that use this?

### Multi-Collateral Support

Liquity V2 enables borrowing against multiple Ethereum-based collateral types, including Lido's staked ETH (stETH), Rocket Pool's staked ETH (rETH), and wrapped ETH (WETH), giving users greater flexibility to align their borrowing strategies with their risk preferences and investment objectives.

For example, by accepting Liquid Staking Tokens (LSTs) such as stETH and rETH, Liquity V2 enables users to maintain staking rewards while leveraging those assets to mint the BOLD stablecoin. The result is simple: you gain liquidity without foregoing either exposure to the markets or yield.

Key advantages:

1. **Enhanced Collateral Diversification** Utilize multiple asset types as collateral, reducing concentration risk compared to single-asset positions.
2. **Improved Volatility Management** Liquid Staking Tokens (LSTs) generate continuous staking rewards, providing a yield buffer against market fluctuations.
3. **Optimised Capital Efficiency** Users can access liquidity from their staked assets while continuing to earn staking rewards in line with the rest of the market.

## User-Set Interest Rates

Liquity V2 shifts control from the protocol to the borrower. Users will be able to set their own interest rates, reducing borrowing costs while increasing redemption risk and vice-versa. Within a predefined range, users will have the flexibility to tailor their borrowing strategies based on market conditions, personal risk appetite, and liquidity needs.

Why we like this, in a nutshell:

• **Cost optimization**: Borrowers can lower their interest rates to minimize borrowing costs in favorable market conditions. This does come with risk, but that’s the beauty of it: users can operate according to their own risk tolerance, not the platform’s.

• **Risk management**: Setting higher interest rates offers protection against redemptions as Troves (collateralized debt positions, more on this later) with lower interest rates are prioritized. Borrowers can thus balance between maintaining liquidity and safeguarding their positions from being redeemed during volatile periods.

• **Dynamic competition**: This feature fosters a more competitive environment, as borrowers actively adjust their rates to remain competitive while managing their risks. The result is a more engaged borrower base that actively fine-tunes their positions in response to market changes.

### Improved Liquidation Process

Liquity V2’s liquidation mechanism has been redesigned to provide greater protection for users while maintaining overall stability. In the event that a borrower’s collateralization ratio drops below a critical threshold, the system automatically triggers a liquidation to prevent under-collateralization with capital from its Stability Pools.

Why we like this, in a nutshell:

• **More efficient liquidations**: Liquity V2 employs an automated system that liquidates only when necessary, reducing the risk of mass liquidations during sharp market downturns. This protects both borrowers and the protocol by ensuring that the system remains over-collateralized at all times.

• **Reduced liquidation penalties**: Borrowers who are liquidated no longer lose all their collateral. Instead, they can recover a portion if the liquidation process leaves a surplus. This provides a sort of safety net for users who may be subject to liquidation during periods of extreme volatility and makes the risk more tolerable.

• **Stability Pool integration**: Liquidations are offset by the Stability Pools (one for each collateral), where users deposit BOLD to earn rewards and help maintain system stability. When a liquidation occurs, Stability Pool depositors receive collateral in exchange for their BOLD, ensuring that the system remains balanced even in turbulent market conditions.

### Yield Distribution

Liquity V2 also introduces a more sophisticated yield distribution system, which allocates the interest earned from borrowing across different participants in the ecosystem. A portion of the interest generated from loans is directed to the corresponding Stability Pool, while the remaining yield is distributed to liquidity providers (LPs) through a yield router that incentivizes decentralized exchange (DEX) liquidity pools.

Why we like this, in a nutshell:

• **Enhanced rewards for Stability Pool participants**: Those who deposit BOLD into the Stability Pools are rewarded with a share of the interest generated by the specific collateral type, alongside their existing rewards from liquidation events.

• **Liquidity incentives for LPs**: Liquity V2 provides additional rewards to LPs who provide liquidity to DEX pools that support BOLD. This creates a more robust liquidity environment for BOLD, making it easier for users to trade and exchange the stablecoin across DeFi platforms.

## Trove NFTs: What are they?

One of the more interesting features introduced in Liquity V2 is the use of Trove NFTs, a tool designed to provide more transparency and flexibility in managing collateralized debt positions. It’s a powerful and elegant solution for the least captivating parts of DeFi bureaucracy. Trove NFTs serve as a representation of each user’s collateral and debt, enabling users to manage their borrowing positions with greater ease and transparency.

In Liquity V2, every time a user opens a Trove (a collateralized debt position), a corresponding NFT is minted. This NFT represents the user’s ownership of the Trove, including all the relevant details such as collateral amount, borrowed BOLD, and the chosen interest rate. It’s simple, transparent, and powerful.

Why we like this, in a nutshell:

• **Simplified management**: Users can easily track the status of their Trove through the NFT, which stores all key information about the collateralized debt. This allows for real-time monitoring of each position, including their collateral ratio, debt amount, and accrued interest.

• **Transferability**: Unlike traditional borrowing systems where a debt position is tied to a specific wallet, Trove NFTs can be transferred between users. This adds an additional layer of flexibility, enabling users to trade or transfer their collateralized debt positions on secondary markets. This feature opens up new possibilities for DeFi, where debt positions can be moved across different users or platforms.

• **Batch management**: Trove NFTs can also be grouped into batches, allowing users or managers to oversee multiple Troves at once. Simple, elegant, transparent, and great for institutional investors and large portfolios.

## A Streamlined Liquidation Process

Another important feature of Trove NFTs is their role in streamlining the liquidation process. In the event that a user’s collateralization ratio falls below the required threshold, the Trove NFT facilitates automatic liquidation, transferring the collateral to the Stability Pool. The use of NFTs simplifies this process by clearly defining the collateral and debt associated with each Trove, making it easier for the protocol to manage liquidations efficiently. It also reduces uncertainty and provides simple protections by gathering all relevant information in the same place, ensuring users are always aware of risk.

Liquity V2 introduces a more robust and efficient liquidation process, which is activated when a user’s collateralization ratio (CR) falls below a certain threshold. In such cases, the system automatically liquidates the Trove to repay the outstanding debt, transferring the collateral to the Stability Pool. In cases where the Stability Pool is insufficient to cover the debt, the collateral and debt are redistributed among other active Troves so as to maintain balance and spread risk out across the system.

### Redemption: Preserving Stability

The redemption mechanism in Liquity V2 allows users to redeem their BOLD stablecoins for a proportional amount of collateral at any time. This feature ensures that BOLD maintains its peg to the U.S. dollar, providing stability across the ecosystem. If BOLD ever falls below its $1 peg, users are incentivized to redeem BOLD for $1 worth of collateral, which brings the stablecoin back into alignment with its intended value.

Why we like this, in a nutshell:

• **Maintaining the Peg**: By allowing users to redeem BOLD for collateral when the price drops below $1, the protocol ensures that market imbalances are quickly corrected. This acts as a safety net, keeping the system stable even during volatile market conditions.

• **Immediate Value Recovery**: Users can always retrieve a dollar’s worth of collateral, minus fees, when redeeming BOLD, offering a straightforward and predictable way to preserve value.

Under severe stress, Liquity V2 introduces urgent redemptions. These are designed to rapidly reduce debt from the affected branch by allowing users to redeem their BOLD without any redemption fees and with a small collateral bonus.

## An Emphasis on Security

The protocol’s resilience, even under challenging market conditions, is one of its strongest features. Here’s how the security structure’s been designed:

### Preventing Frontrunning Attacks

Frontrunning is a well-known vulnerability in DeFi systems, where attackers attempt to execute transactions just before an anticipated market change to profit from price differences. In Liquity V2, this issue is mitigated through a number of mechanisms:

• **Oracle-Based Price Feeds**: Liquity V2 uses trusted oracles to provide price data for collateral assets like stETH and rETH. These oracles are resistant to manipulation and provide reliable pricing information, reducing the risk of frontrunning during redemptions or liquidations.

• **Redemption Fees**: Liquity V2 implements a redemption fee structure to dissuade frontrunning. Fees are applied to redemptions, ensuring that even if an attacker tries to exploit price differences, the associated costs would make the attack unprofitable.

### Defense Against Redemption Routing Manipulation

Redemption routing, which determines how collateral is distributed during redemptions, can be manipulated. Liquity V2 addresses this risk by ensuring that the distribution of redemptions across collateral types is proportional to their “unbacked” portion—collateral debt not covered by the Stability Pool. This prevents attackers from gaming the system.

Additionally, Liquity V2 ensures that:

• **Competitive Arbitrage Reduces Manipulation**: Redemption arbitrage remains highly competitive, meaning attackers face significant barriers in trying to manipulate the system for personal gain. Flash loans and high transaction fees further discourage manipulation.

• **Protection of System Stability**: Since the redemption mechanism is designed primarily to restore the BOLD peg, any attempts at manipulation would have minimal impact on the protocol’s overall stability.

### Oracle Failure Management

Oracles play a critical role in feeding price data into the Liquity V2 system. In the rare event of an oracle failure, the system has built-in safeguards to prevent large-scale exploits or market distortions:

• **Last Known Price Usage**: If an oracle fails or becomes unresponsive, Liquity V2 defaults to using the last known accurate price for collateral valuation. This ensures that the system remains operational even during oracle outages.

• **Collateral Branch Shutdown**: In extreme cases, such as an extended oracle failure or a collapse in collateral prices, Liquity V2 can shut down the affected collateral branch. This halts borrowing operations, freezes interest accrual, and triggers urgent redemptions to quickly reduce the system’s overall debt, preventing a further escalation of risks.

### Batch Delegation and Management Protections

Liquity V2 introduces batch delegation, allowing users to group their Troves under a single batch manager to streamline operations. While this can be quite convenient, it also requires safeguards to ensure that batch managers act in the best interest of users:

• **Premature Adjustment Fees**: Batch managers are discouraged from making frequent, unnecessary changes to interest rates through premature adjustment fees.

• **Reputation Incentives for Batch Managers**: Competent batch managers, who demonstrate a consistent ability to manage Troves efficiently, will naturally attract more borrowers, self-regulating an environment where poor managers face fewer participants.

### Minimizing Liquidation Risk

Liquity V2’s improved liquidation mechanisms are designed to minimize risk for users:

• **Automated Liquidations**: Liquidations occur only when absolutely necessary, triggered by a drop in the collateralization ratio below the required threshold. This helps protect the system from becoming over-leveraged, reducing the likelihood of large-scale liquidations.

• **Gas Compensation for Liquidators**: Liquidators are compensated for the gas costs incurred during liquidation through a mix of collateral and WETH, ensuring that liquidators are incentivized to act promptly without incurring losses due to transaction costs.

Liquity V2’s security features provide users and investors with confidence in the platform’s ability to remain stable and secure, even under extreme market conditions. By addressing key vulnerabilities such as frontrunning, oracle failures, and liquidation risks, the protocol continues to prioritize safety and reliability for its users.

## Licensing Liquity V2: The Rationale for BUSL

With the launch of V2, Liquity shifts to a Business Source License (BUSL) to encourage structured, intentional expansion. This approach seeks to address challenges from V1’s open-source model, where forks proliferated but often lacked coordination in liquidity and standards, impacting alignment and usability. The BUSL aims to foster “friendly forks,” allowing select teams across EVM-compatible chains to launch unique deployments that support Liquity’s stablecoin vision without dilution.

### Friendly Forks & Ecosystem Expansion

By introducing selective forking under BUSL, Liquity V2 positions itself as a leading solution for on-chain, sovereign stablecoins. Teams can leverage V2’s multi-collateral configurations and user-set interest rates while adhering to Liquity’s standards, enhancing protocol resilience and reducing fragmentation. Investors benefit from a unified, high-quality landscape, where Liquity’s influence extends across DeFi ecosystems with minimized risk of unaligned development.

## In short

It’s Subvisual’s view that Liquity V2 is a significant upgrade on the status quo for DeFi. It brings much more to the table than just a few new features—it’s a sober and thought-through rethinking of how we let users engage with their own finances. Its security and system efficiency mean it goes beyond the realm of ideas and actually materializes a new way of doing things.

If you share any of these inclinations, we encourage you to follow Subvisual on Twitter and LinkedIn for news, because we get the distinct feeling it won’t be the last we’ll be discussing it.