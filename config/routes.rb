Rails.application.routes.draw do
  scope "api" do

    resources :comics, except: [:new, :edit] do
      resources :stripes, except: [:new, :edit]
    end
  end
end
