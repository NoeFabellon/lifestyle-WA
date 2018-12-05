module ApplicationHelper
  def format_date(date)
    Time.parse(date).strftime('%b %d, %Y')
  end

  def active_page?(page)
    if current_page?(page)
      "active-page"
    else
      ""
    end
  end
  
  def convert_to_boolean(value)
    if value == 'true'
      true
    elsif value == 'false'
      false
    end
  end
end
