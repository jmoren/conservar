Rails.application.routes.draw do

  devise_for :users, controllers: { registrations: 'registrations', sessions: 'sessions', :confirmations => "confirmations" }  
  as :user do
    patch '/user/confirmation' => 'confirmations#update', :via => :patch, :as => :update_user_confirmation
  end
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

  resources :reports, only: [:index]
  
  resources :collections do
    resources :items, except: [:show]
    resources :reports, except: [:edit, :update]
  end

  resources :images, only: [:index, :show]
  resources :exams, only: [:index]

  resources :organizations
  resources :users
  
  get '/search'  => "search#index"
  get '/current_user' => 'users#get_current_user'

  root 'home#index'
end
