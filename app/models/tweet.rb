class Tweet < ApplicationRecord
  # プロパティの設定
  attr_accessor :contents

  def initialize(contents)
    @contents = contents
  end
end
