json.(comic, :id, :is_published, :stripes_count)
json.stripes comic.stripes do |stripe|
  json.partial! 'stripes/stripe' , locals: { stripe: stripe }
end