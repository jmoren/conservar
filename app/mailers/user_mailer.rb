class UserMailer < ActionMailer::Base
  default :from => CONFIG_EMAIL[:user]
end