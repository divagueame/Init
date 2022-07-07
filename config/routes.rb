Rails.application.routes.draw do
  resources :notes
  patch 'drag/note'
  root 'notes#index'
end
