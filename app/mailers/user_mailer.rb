class UserMailer < ActionMailer::Base
  default :from => Settings[:user]
end