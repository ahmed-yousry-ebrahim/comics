json.(stripe, :id, :caption, :order)
json.web_image_url asset_url(stripe.image.url(:web))
json.mobile_image_url asset_url(stripe.image.url(:mobile))