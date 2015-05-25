set :repo_url, 'git@github-subvisual.co:groupbuddies/subvisual.co'
set :application, 'subvisual.co'
set :stage, :production
set :branch, (ENV['DEPLOY_BRANCH'] || :master)

set :linked_dirs, %w(log)

set :format, :pretty
set :log_level, :debug
set :pty, true
set :scm, :middleman
