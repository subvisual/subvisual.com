task default: %w[build]

desc 'Build the app'
task :build do
  sh 'rm -rf build'
  sh 'middleman build'
end

desc 'Preview the app'
task :server do
  sh 'middleman server -p 3000'
end
