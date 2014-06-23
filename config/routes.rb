Rails.application.routes.draw do

  resources :items, only: [:show] do
    resources :item_details
    resources :treatments do
      post :close
      post :open
      resources :treatment_notes
      resources :interventions
    end
  end
  
  resources :treatments, only: [:show] do
    resources :treatment_notes
  end

  resources :collections do
    resources :items
  end

  root 'home#index'
end
