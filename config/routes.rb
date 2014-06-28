Rails.application.routes.draw do

  resources :items, only: [:show, :update] do
    patch :upload, on: :member 
    resources :item_details
    resources :images
    resources :treatments do
      post :close
      post :open
    end
  end

  resources :images, only: [:index, :show]

  resources :treatments, only: [:index] do
    resources :treatment_notes
    resources :images
    resources :interventions
  end

  resources :collections do
    resources :items
  end

  root 'home#index'
end
