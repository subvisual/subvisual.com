module UrlHelpers
  def image_url(source)
    data.site.url + image_path(source)
  end
end
