terraform {
  backend "s3" {
    bucket = "subvisual.com.terraform-state"
    key    = "netlify.tfstate"
    region = "eu-central-1"
  }
}

provider "netlify" {
}

resource "netlify_site" "subvisual" {
  name = "subvisual"

  repo {
    command = "npm run build"
    dir = "/public"
    provider = "github"
    repo_path = "subvisual/subvisual.co"
    repo_branch = "2019-rebranding"
  }
}
