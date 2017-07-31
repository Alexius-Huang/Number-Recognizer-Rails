Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'train#index'
  post 'feed',             controller: :train, to: :feed
  post 'train_classifier', controller: :train, to: :train_classifier
  post 'predict',          controller: :train, to: :predict
end
