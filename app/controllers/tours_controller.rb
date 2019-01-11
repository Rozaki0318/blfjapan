class ToursController < ApplicationController

  API_KEY = Rails.application.secrets.API_KEY

  def getinfo
    client = Twitter::REST::Client.new do |config|
      config.consumer_key         = Rails.application.secrets.twitter_consumer_key
      config.consumer_secret      = Rails.application.secrets.twitter_consumer_secret
    end
    @tweets = []
    since_id = nil
    if params[:keyword].present?
      search_words = "#{params[:keyword]}+" "+sightseeing" 
      tweets = client.search(search_words, count: 10, result_type: "recent", exclude: "retweets", since_id: since_id)
      # 取得したツイートをモデルに渡す
      tweets.take(10).each do |tw|
        tweet = Tweet.new(tw.full_text)
        @tweets << tweet
      end
    
    
    requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=' + params[:keyword].to_s + '&APPID=' + API_KEY
    uri = URI.parse(requestUrl)
    response = Net::HTTP.get(uri)
    @weather = JSON.parse(response)
  end
    
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: { tweets: @tweets, weather: @weather }}
    end
  end
end
