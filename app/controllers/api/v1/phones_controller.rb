class Api::V1::PhonesController < ApplicationController
    before_action :set_phone, only: %i[ show edit update destroy ]
  
    def index
      @phones = Phone.all.order(brand: :asc)
      render json: @phones
    end
  
    def show
        if @phones
            render json: @phones
        else
            render json: @phones.errors
        end
    end
  
    def new
      @phone = Phone.new
    end

    def edit
    end

    def create
      @phone = Phone.new(phone_params)
  
      respond_to do |format|
        if @phone.save
            render json: @phones
        else
            render json: @phones.errors
        end
      end
    end
  
    def update
    end
  
    def destroy
      @phone.destroy
      render json: { notice: 'Phone was successfully removed.'}
    end
  
    private
      def set_phone
        @phone = Phone.find(params[:id])
      end
  
      def phone_params
        params.require(:phone).permit(:brand, :country_origin, :ram)
      end
end