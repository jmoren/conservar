Rails.application.routes.draw do

  resources :items, only: [:show] do
    resources :item_details
    resources :treatments do
      resources :interventions
    end
  end
  
  resources :collections do
    resources :items
  end

  root 'home#index'
end
