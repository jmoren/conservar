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

  resources :treatments, only: [:index] do
    resources :treatment_notes
    resources :images, except: [:index]
    resources :interventions
    resources :exams, except: [:index]
  end

  resources :collections do
    resources :items, except: [:show]
  end

  resources :images, only: [:index, :show]
  resources :exams, only: [:index]

  root 'home#index'
end
