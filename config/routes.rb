Rails.application.routes.draw do
  mount_roboto
  get 'main' => 'tours#getinfo'
end
