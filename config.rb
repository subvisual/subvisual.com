require 'slim'
Slim::Engine.disable_option_validator!

page '/google7c9e77390335f0f4.html', :layout => false, directory_index: false
page 'sitemap.html', layout: false
page 'sitemap.xml', layout: false
page 'feed.xml', layout: false

# Add bower's directory to sprockets asset path
after_configuration do
  @bower_config = JSON.parse IO.read("#{root}/.bowerrc")
  sprockets.append_path File.join "#{root}", @bower_config["directory"]
end

after_configuration do
  %w(javascripts stylesheets images).each do |dir|
    sprockets.append_path File.join "#{root}", "vendor/blue/#{dir}"
  end

  sprockets.import_asset "blue/subvisual_separator.svg"
  sprockets.import_asset "blue/link-arrow.svg"
  sprockets.import_asset "blue/link-arrow-white.svg"
  sprockets.import_asset "blue/link-arrow-cerulean.svg"
end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
set :partials_dir, 'partials'

activate :autoprefixer do |config|
  config.browsers = ['ie >= 11']
end

activate :directory_indexes
activate :es6

configure :development do
  set :blog_posts_json, 'http://localhost:3000'
end

configure :build do
  set :blog_posts_json, 'https://subvisual.co'

  activate :minify_css
  activate :minify_javascript
  activate :asset_hash
  activate :critical_css, width: 1920, height: 1080
  activate :gzip

  # activate :imageoptim do |options|
  #   options.manifest = true
  #   options.nice = true
  #   options.threads = true
  #   options.allow_lossy = true

  #   options.svgo = false
  #   options.jpegoptim = { max_quality: 80 }
  # end

  activate :robots, rules: [
    { user_agent: '*', allow: ['/'] }
  ],
  sitemap: "#{data.site.url}/sitemap.xml"
end
