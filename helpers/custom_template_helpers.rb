# Methods defined in the helpers block are available in templates
module CustomTemplateHelpers
  def page_title
    current_page.data.title || data.site.title
  end

  def page_description
    current_page.data.description || data.site.description
  end

  def current_page_url
    "#{data.site.url}#{current_page.url}"
  end

  def page_url page
    "#{data.site.url}#{page.url}"
  end

  def nav_item(link_text, page_url, page_name = '', options = {})
    link_class = options.delete(:link_class) || "Nav-link"
    options[:class] ||= "Nav-item"
    page_name = page_url[1..-1] if page_name.empty?
    options[:class] << " is-selected" if current_page.data.page == page_name
    content_tag(:li, link_to(link_text, page_url, class: link_class), options)
  end

  def nav_overlay_item(link_text, page_url, page_name = '')
    nav_item(link_text,page_url, page_name,
             class: 'NavOverlay-item', link_class: 'NavOverlay-link')
  end

  def nav_burger_class
    if light_or_transparent_nav?
      'Burger--light'
    end
  end

  def nav_logo_class
    if light_or_transparent_nav?
      'NavLogo--mono'
    end
  end

  def page_twitter_card_type
    current_page.data.twitter_card_type || 'summary'
  end

  def page_image
    current_page.data.image_path || data.site.logo_image_path
  end

  # Social share URLs
  def twitter_url
    "https://twitter.com/share?text=“#{page_title}”" +
                               "&url=#{current_page_url}" +
                               "&via=#{data.site.twitter_handle}"
  end

  def facebook_url
    "https://www.facebook.com/dialog/feed?app_id=#{data.site.facebook_app_id}" +
                                          "&caption=#{page_title}" +
                                          "&picture=#{page_image}" +
                                          "&name=“#{page_title}”" +
                                          "&description=#{page_description}" +
                                          "&display=popup" +
                                          "&link=#{current_page_url}" +
                                          "&redirect_uri=#{current_page_url}"
  end

  def google_plus_url
    "https://plus.google.com/share?url=#{current_page_url}"
  end

  def linkedin_url
    "http://www.linkedin.com/shareArticle?mini=true" +
                                          "&url=#{current_page_url}" +
                                          "&title=#{page_title}" +
                                          "&summary=#{page_description}" +
                                          "&source=#{data.site.url}"
  end

  private

  def light_or_transparent_nav?
    current_page.data.nav_class.match(/Nav--(light|transparent)/)
  end
end
