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

task styleguide: 'styleguide:default'

namespace :styleguide do
  require 'tempfile'

  desc 'Serve the styleguide'
  task :default do
    generate_styleguide
  end

  task :watch do
    generate_styleguide true
  end

  private

  def generate_styleguide(watch = false)
    output_folder = 'styleguide'
    Tempfile.open(['all', '.css']) do |f|
      f.write compile_stylesheets
      f.flush
      sh "rm -rf #{output_folder}; mkdir #{output_folder}; cp source/images/* #{output_folder}"
      sh styleguide_command(f.path, output_folder, watch)
    end
  end

  def compile_stylesheets
    `bundle exec sass --load-path vendor/blue/stylesheets --load-path vendor/blue/images --load-path bower_components --require font-awesome-sass source/stylesheets/all.scss`
  end

  def styleguide_command(style_source, output_folder, watch)
    kss_sources = ['source/stylesheets/**/*.scss', 'vendor/blue/stylesheets/**/*.scss']
    options = [
      './node_modules/.bin/styleguide',
      '--server',
      "#{watch ? '--watch' : ''}",
      '--title "Blue Styleguide"',
      "--output #{output_folder}",
      '--port 4000',
      kss_sources.map { |s| "--kss-source '#{s}'" }.join(' '),
      "--style-source '#{style_source}'",
      "--common-class 'Theme'",
      '--extra-head "<script src="//use.typekit.net/wbx6iwp.js"></script><script type="text/javascript">try{Typekit.load();}catch(e){}</script>"'
    ].join(' ')
  end
end
