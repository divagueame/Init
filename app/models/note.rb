class Note < ApplicationRecord
  has_one_attached :kitty_pic do |attachable|
    attachable.variant :thumb, resize_to_fill: [150, 150]
  end
  acts_as_list
end
