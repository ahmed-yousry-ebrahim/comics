FactoryGirl.define do
  factory :stripe do |s|
    association :comic
    s.sequence(:caption) { |n| "stripe number #{n}" }
    image { File.new(Rails.root.join('spec', 'photos', 'test.png')) }
  end

end
