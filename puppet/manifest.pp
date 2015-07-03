gb::nginx_conf { 'subvisual.co':
  path => 'nginx.production.conf',
}

gb::nginx_conf { 'test.subvisual.co':
  path => 'nginx.staging.conf',
}
