module ImageHelpers
  def retina_tag(src, **options)
    name, _dot, extension = src.rpartition(".")

    image_tag(
      src,
      srcset: "#{name}.#{extension} 1x, #{name}@2x.#{extension} 2x",
      **options
    )
  end
end
