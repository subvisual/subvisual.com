task default: %i[lint build]

desc 'Build the app'
task :build do
  sh 'rm -rf build'
  sh 'middleman build'
end

desc 'Preview the app'
task :server do
  sh 'middleman server -p 3000'
end

require 'scss_lint/rake_task'
SCSSLint::RakeTask.new do |t|
  t.config = '.scss-lint.yml'
end

desc 'Lint code'
task :lint do
  require 'scss_lint'
  system "rake 'scss_lint'"
end
