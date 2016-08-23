(function(window, $) {

  function loadBlogPosts() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4 && xhttp.status == 200)
        updatePosts(JSON.parse(xhttp.responseText));
    };
    xhttp.open("GET", "https://subvisual.co/blog/posts.json", true);
    xhttp.send();

    function updatePosts(posts) {
      posts.splice(0, 2).forEach(post => {
        const author = post.author;
        const template = $('#blog-post-template').clone().find('.HorizontalGrid-cell');
        template.find('.blog-post-title').html(post.title);
        template.find('.blog-post-content').html(post.processed_intro);
        template.find('.blog-post-author-picture').attr('src', 'https://subvisual.co/' + author.photo_url);
        template.find('.blog-post-author-name').attr('href', `https://twitter.com/${author.twitter_handle}`);
        template.find('.blog-post-author-name').html(`${author.first_name} ${author.last_name}`);

        const tags = template.find('.blog-post-tags');
        post.tag_list.forEach((tag, index) => {
          if (index !== 0) tags.append(', ');
          const el = $(`<span class="Tag Tag--${tag}">${tag}<span>`);
          tags.append(el);
        });

        $('#blog-posts').append(template);
      });
    }
  }

  window.homepage = window.homepage || {};
  window.homepage.loadBlogPosts = loadBlogPosts;
})(window, window.$);
