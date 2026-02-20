Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:5173' # Vite default dev port

    resource '/graphql',
      headers: :any,
      methods: [:post, :options]
  end
end
