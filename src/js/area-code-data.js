// File: src/js/area-code-data.js
// This file contains the single source of truth for area code and time zone data.

const areaCodeData = [
  // Alabama
  { "areaCode": "205", "state": "Alabama", "stateAbbr": "AL", "primaryCity": "Birmingham", "timeZone": "America/Chicago" },
  { "areaCode": "251", "state": "Alabama", "stateAbbr": "AL", "primaryCity": "Mobile", "timeZone": "America/Chicago" },
  { "areaCode": "256", "state": "Alabama", "stateAbbr": "AL", "primaryCity": "Huntsville", "timeZone": "America/Chicago" },
  { "areaCode": "334", "state": "Alabama", "stateAbbr": "AL", "primaryCity": "Montgomery", "timeZone": "America/Chicago" },
  { "areaCode": "938", "state": "Alabama", "stateAbbr": "AL", "primaryCity": "Huntsville", "timeZone": "America/Chicago" },

  // Alaska
  { "areaCode": "907", "state": "Alaska", "stateAbbr": "AK", "primaryCity": "", "timeZone": "America/Anchorage" },

  // Arizona (no DST)
  { "areaCode": "480", "state": "Arizona", "stateAbbr": "AZ", "primaryCity": "Mesa", "timeZone": "America/Phoenix" },
  { "areaCode": "520", "state": "Arizona", "stateAbbr": "AZ", "primaryCity": "Tucson", "timeZone": "America/Phoenix" },
  { "areaCode": "602", "state": "Arizona", "stateAbbr": "AZ", "primaryCity": "Phoenix", "timeZone": "America/Phoenix" },
  { "areaCode": "623", "state": "Arizona", "stateAbbr": "AZ", "primaryCity": "Glendale", "timeZone": "America/Phoenix" },
  { "areaCode": "928", "state": "Arizona", "stateAbbr": "AZ", "primaryCity": "Yuma", "timeZone": "America/Phoenix" },

  // Arkansas
  { "areaCode": "479", "state": "Arkansas", "stateAbbr": "AR", "primaryCity": "Fort Smith", "timeZone": "America/Chicago" },
  { "areaCode": "501", "state": "Arkansas", "stateAbbr": "AR", "primaryCity": "Little Rock", "timeZone": "America/Chicago" },
  { "areaCode": "870", "state": "Arkansas", "stateAbbr": "AR", "primaryCity": "Texarkana", "timeZone": "America/Chicago" },

  // California
  { "areaCode": "209", "state": "California", "stateAbbr": "CA", "primaryCity": "Stockton", "timeZone": "America/Los_Angeles" },
  { "areaCode": "213", "state": "California", "stateAbbr": "CA", "primaryCity": "Los Angeles", "timeZone": "America/Los_Angeles" },
  { "areaCode": "310", "state": "California", "stateAbbr": "CA", "primaryCity": "Santa Monica", "timeZone": "America/Los_Angeles" },
  { "areaCode": "323", "state": "California", "stateAbbr": "CA", "primaryCity": "Los Angeles", "timeZone": "America/Los_Angeles" },
  { "areaCode": "408", "state": "California", "stateAbbr": "CA", "primaryCity": "San Jose", "timeZone": "America/Los_Angeles" },
  { "areaCode": "415", "state": "California", "stateAbbr": "CA", "primaryCity": "San Francisco", "timeZone": "America/Los_Angeles" },
  { "areaCode": "424", "state": "California", "stateAbbr": "CA", "primaryCity": "Santa Monica", "timeZone": "America/Los_Angeles" },
  { "areaCode": "442", "state": "California", "stateAbbr": "CA", "primaryCity": "Oceanside", "timeZone": "America/Los_Angeles" },
  { "areaCode": "510", "state": "California", "stateAbbr": "CA", "primaryCity": "Oakland", "timeZone": "America/Los_Angeles" },
  { "areaCode": "530", "state": "California", "stateAbbr": "CA", "primaryCity": "Chico", "timeZone": "America/Los_Angeles" },
  { "areaCode": "559", "state": "California", "stateAbbr": "CA", "primaryCity": "Fresno", "timeZone": "America/Los_Angeles" },
  { "areaCode": "562", "state": "California", "stateAbbr": "CA", "primaryCity": "Long Beach", "timeZone": "America/Los_Angeles" },
  { "areaCode": "619", "state": "California", "stateAbbr": "CA", "primaryCity": "San Diego", "timeZone": "America/Los_Angeles" },
  { "areaCode": "626", "state": "California", "stateAbbr": "CA", "primaryCity": "Pasadena", "timeZone": "America/Los_Angeles" },
  { "areaCode": "650", "state": "California", "stateAbbr": "CA", "primaryCity": "San Mateo", "timeZone": "America/Los_Angeles" },
  { "areaCode": "657", "state": "California", "stateAbbr": "CA", "primaryCity": "Anaheim", "timeZone": "America/Los_Angeles" },
  { "areaCode": "661", "state": "California", "stateAbbr": "CA", "primaryCity": "Bakersfield", "timeZone": "America/Los_Angeles" },
  { "areaCode": "669", "state": "California", "stateAbbr": "CA", "primaryCity": "San Jose", "timeZone": "America/Los_Angeles" },
  { "areaCode": "707", "state": "California", "stateAbbr": "CA", "primaryCity": "Santa Rosa", "timeZone": "America/Los_Angeles" },
  { "areaCode": "714", "state": "California", "stateAbbr": "CA", "primaryCity": "Anaheim", "timeZone": "America/Los_Angeles" },
  { "areaCode": "747", "state": "California", "stateAbbr": "CA", "primaryCity": "Burbank", "timeZone": "America/Los_Angeles" },
  { "areaCode": "760", "state": "California", "stateAbbr": "CA", "primaryCity": "Oceanside", "timeZone": "America/Los_Angeles" },
  { "areaCode": "805", "state": "California", "stateAbbr": "CA", "primaryCity": "Santa Barbara", "timeZone": "America/Los_Angeles" },
  { "areaCode": "818", "state": "California", "stateAbbr": "CA", "primaryCity": "Burbank", "timeZone": "America/Los_Angeles" },
  { "areaCode": "831", "state": "California", "stateAbbr": "CA", "primaryCity": "Monterey", "timeZone": "America/Los_Angeles" },
  { "areaCode": "858", "state": "California", "stateAbbr": "CA", "primaryCity": "La Jolla", "timeZone": "America/Los_Angeles" },
  { "areaCode": "909", "state": "California", "stateAbbr": "CA", "primaryCity": "San Bernardino", "timeZone": "America/Los_Angeles" },
  { "areaCode": "916", "state": "California", "stateAbbr": "CA", "primaryCity": "Sacramento", "timeZone": "America/Los_Angeles" },
  { "areaCode": "925", "state": "California", "stateAbbr": "CA", "primaryCity": "Walnut Creek", "timeZone": "America/Los_Angeles" },
  { "areaCode": "949", "state": "California", "stateAbbr": "CA", "primaryCity": "Irvine", "timeZone": "America/Los_Angeles" },
  { "areaCode": "951", "state": "California", "stateAbbr": "CA", "primaryCity": "Riverside", "timeZone": "America/Los_Angeles" },
  { "areaCode": "341", "state": "California", "stateAbbr": "CA", "primaryCity": "Oakland", "timeZone": "America/Los_Angeles" },
  { "areaCode": "350", "state": "California", "stateAbbr": "CA", "primaryCity": "Stockton", "timeZone": "America/Los_Angeles" },
  { "areaCode": "369", "state": "California", "stateAbbr": "CA", "primaryCity": "Vallejo", "timeZone": "America/Los_Angeles" },
  { "areaCode": "628", "state": "California", "stateAbbr": "CA", "primaryCity": "San Francisco", "timeZone": "America/Los_Angeles" },
  { "areaCode": "738", "state": "California", "stateAbbr": "CA", "primaryCity": "Los Angeles", "timeZone": "America/Los_Angeles" },
  { "areaCode": "840", "state": "California", "stateAbbr": "CA", "primaryCity": "San Bernardino", "timeZone": "America/Los_Angeles" },

  // Colorado
  { "areaCode": "303", "state": "Colorado", "stateAbbr": "CO", "primaryCity": "Denver", "timeZone": "America/Denver" },
  { "areaCode": "719", "state": "Colorado", "stateAbbr": "CO", "primaryCity": "Colorado Springs", "timeZone": "America/Denver" },
  { "areaCode": "720", "state": "Colorado", "stateAbbr": "CO", "primaryCity": "Denver", "timeZone": "America/Denver" },
  { "areaCode": "970", "state": "Colorado", "stateAbbr": "CO", "primaryCity": "Fort Collins", "timeZone": "America/Denver" },
  { "areaCode": "983", "state": "Colorado", "stateAbbr": "CO", "primaryCity": "Denver", "timeZone": "America/Denver" },

  // Connecticut
  { "areaCode": "203", "state": "Connecticut", "stateAbbr": "CT", "primaryCity": "Bridgeport", "timeZone": "America/New_York" },
  { "areaCode": "475", "state": "Connecticut", "stateAbbr": "CT", "primaryCity": "Bridgeport", "timeZone": "America/New_York" },
  { "areaCode": "860", "state": "Connecticut", "stateAbbr": "CT", "primaryCity": "Hartford", "timeZone": "America/New_York" },
  { "areaCode": "959", "state": "Connecticut", "stateAbbr": "CT", "primaryCity": "Hartford", "timeZone": "America/New_York" },

  // Delaware
  { "areaCode": "302", "state": "Delaware", "stateAbbr": "DE", "primaryCity": "", "timeZone": "America/New_York" },

  // District of Columbia
  { "areaCode": "202", "state": "District of Columbia", "stateAbbr": "DC", "primaryCity": "", "timeZone": "America/New_York" },
  { "areaCode": "771", "state": "District of Columbia", "stateAbbr": "DC", "primaryCity": "", "timeZone": "America/New_York" },

  // Florida
  { "areaCode": "239", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Ft. Myers", "timeZone": "America/New_York" },
  { "areaCode": "305", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Miami", "timeZone": "America/New_York" },
  { "areaCode": "321", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Cocoa", "timeZone": "America/New_York" },
  { "areaCode": "352", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Gainesville", "timeZone": "America/New_York" },
  { "areaCode": "386", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Daytona", "timeZone": "America/New_York" },
  { "areaCode": "407", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Orlando", "timeZone": "America/New_York" },
  { "areaCode": "561", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Palm Beach", "timeZone": "America/New_York" },
  { "areaCode": "727", "state": "Florida", "stateAbbr": "FL", "primaryCity": "St. Petersburg", "timeZone": "America/New_York" },
  { "areaCode": "754", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Fort Lauderdale", "timeZone": "America/New_York" },
  { "areaCode": "772", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Vero Beach", "timeZone": "America/New_York" },
  { "areaCode": "786", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Miami", "timeZone": "America/New_York" },
  { "areaCode": "813", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Tampa", "timeZone": "America/New_York" },
  { "areaCode": "850", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Tallahassee", "timeZone": "America/New_York" },
  { "areaCode": "863", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Lakeland", "timeZone": "America/New_York" },
  { "areaCode": "904", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Jacksonville", "timeZone": "America/New_York" },
  { "areaCode": "941", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Sarasota", "timeZone": "America/New_York" },
  { "areaCode": "954", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Fort Lauderdale", "timeZone": "America/New_York" },
  { "areaCode": "656", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Tampa", "timeZone": "America/New_York" },
  { "areaCode": "689", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Orlando", "timeZone": "America/New_York" },
  { "areaCode": "324", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Jacksonville", "timeZone": "America/New_York" },
  { "areaCode": "645", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Miami", "timeZone": "America/New_York" },
  { "areaCode": "728", "state": "Florida", "stateAbbr": "FL", "primaryCity": "Palm Beach", "timeZone": "America/New_York" },

  // Georgia
  { "areaCode": "229", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Albany", "timeZone": "America/New_York" },
  { "areaCode": "404", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Atlanta", "timeZone": "America/New_York" },
  { "areaCode": "470", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Atlanta", "timeZone": "America/New_York" },
  { "areaCode": "478", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Macon", "timeZone": "America/New_York" },
  { "areaCode": "678", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Atlanta", "timeZone": "America/New_York" },
  { "areaCode": "706", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Augusta", "timeZone": "America/New_York" },
  { "areaCode": "762", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Augusta", "timeZone": "America/New_York" },
  { "areaCode": "770", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Atlanta", "timeZone": "America/New_York" },
  { "areaCode": "912", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Savannah", "timeZone": "America/New_York" },
  { "areaCode": "943", "state": "Georgia", "stateAbbr": "GA", "primaryCity": "Atlanta", "timeZone": "America/New_York" },

  // Hawaii
  { "areaCode": "808", "state": "Hawaii", "stateAbbr": "HI", "primaryCity": "", "timeZone": "Pacific/Honolulu" },

  // Idaho (statewide; mixed MST/PST -> primary MST)
  { "areaCode": "208", "state": "Idaho", "stateAbbr": "ID", "primaryCity": "", "timeZone": "America/Denver" },
  { "areaCode": "986", "state": "Idaho", "stateAbbr": "ID", "primaryCity": "", "timeZone": "America/Denver" },

  // Illinois
  { "areaCode": "217", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Springfield", "timeZone": "America/Chicago" },
  { "areaCode": "224", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Northbrook", "timeZone": "America/Chicago" },
  { "areaCode": "309", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Peoria", "timeZone": "America/Chicago" },
  { "areaCode": "312", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Chicago", "timeZone": "America/Chicago" },
  { "areaCode": "331", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Naperville", "timeZone": "America/Chicago" },
  { "areaCode": "618", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Collinsville", "timeZone": "America/Chicago" },
  { "areaCode": "630", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Downers Grove", "timeZone": "America/Chicago" },
  { "areaCode": "708", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Oak Brook", "timeZone": "America/Chicago" },
  { "areaCode": "773", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Chicago", "timeZone": "America/Chicago" },
  { "areaCode": "779", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Rockford", "timeZone": "America/Chicago" },
  { "areaCode": "815", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Rockford", "timeZone": "America/Chicago" },
  { "areaCode": "847", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Northbrook", "timeZone": "America/Chicago" },
  { "areaCode": "872", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Chicago", "timeZone": "America/Chicago" },
  { "areaCode": "861", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Peoria", "timeZone": "America/Chicago" },
  { "areaCode": "730", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "Collinsville", "timeZone": "America/Chicago" },
  { "areaCode": "557", "state": "Illinois", "stateAbbr": "IL", "primaryCity": "St. Louis (IL side)", "timeZone": "America/Chicago" },

  // Indiana
  { "areaCode": "219", "state": "Indiana", "stateAbbr": "IN", "primaryCity": "Gary", "timeZone": "America/New_York" },
  { "areaCode": "260", "state": "Indiana", "stateAbbr": "IN", "primaryCity": "Fort Wayne", "timeZone": "America/New_York" },
  { "areaCode": "317", "state": "Indiana", "stateAbbr": "IN", "primaryCity": "Indianapolis", "timeZone": "America/New_York" },
  { "areaCode": "463", "state": "Indiana", "stateAbbr": "IN", "primaryCity": "Indianapolis", "timeZone": "America/New_York" },
  { "areaCode": "574", "state": "Indiana", "stateAbbr": "IN", "primaryCity": "South Bend", "timeZone": "America/New_York" },
  { "areaCode": "765", "state": "Indiana", "stateAbbr": "IN", "primaryCity": "Lafayette", "timeZone": "America/New_York" },
  { "areaCode": "812", "state": "Indiana", "stateAbbr": "IN", "primaryCity": "Evansville", "timeZone": "America/New_York" },
  { "areaCode": "930", "state": "Indiana", "stateAbbr": "IN", "primaryCity": "Evansville", "timeZone": "America/New_York" },

  // Iowa
  { "areaCode": "319", "state": "Iowa", "stateAbbr": "IA", "primaryCity": "Cedar Rapids", "timeZone": "America/Chicago" },
  { "areaCode": "515", "state": "Iowa", "stateAbbr": "IA", "primaryCity": "Des Moines", "timeZone": "America/Chicago" },
  { "areaCode": "563", "state": "Iowa", "stateAbbr": "IA", "primaryCity": "Davenport", "timeZone": "America/Chicago" },
  { "areaCode": "641", "state": "Iowa", "stateAbbr": "IA", "primaryCity": "Fairfield", "timeZone": "America/Chicago" },
  { "areaCode": "712", "state": "Iowa", "stateAbbr": "IA", "primaryCity": "Sioux City", "timeZone": "America/Chicago" },

  // Kansas
  { "areaCode": "316", "state": "Kansas", "stateAbbr": "KS", "primaryCity": "Wichita", "timeZone": "America/Chicago" },
  { "areaCode": "620", "state": "Kansas", "stateAbbr": "KS", "primaryCity": "Hutchinson", "timeZone": "America/Chicago" },
  { "areaCode": "785", "state": "Kansas", "stateAbbr": "KS", "primaryCity": "Topeka", "timeZone": "America/Chicago" },
  { "areaCode": "913", "state": "Kansas", "stateAbbr": "KS", "primaryCity": "Kansas City", "timeZone": "America/Chicago" },

  // Kentucky
  { "areaCode": "270", "state": "Kentucky", "stateAbbr": "KY", "primaryCity": "Owensboro", "timeZone": "America/New_York" },
  { "areaCode": "364", "state": "Kentucky", "stateAbbr": "KY", "primaryCity": "Owensboro", "timeZone": "America/New_York" },
  { "areaCode": "502", "state": "Kentucky", "stateAbbr": "KY", "primaryCity": "Louisville", "timeZone": "America/New_York" },
  { "areaCode": "606", "state": "Kentucky", "stateAbbr": "KY", "primaryCity": "Ashland", "timeZone": "America/New_York" },
  { "areaCode": "859", "state": "Kentucky", "stateAbbr": "KY", "primaryCity": "Lexington", "timeZone": "America/New_York" },

  // Louisiana
  { "areaCode": "225", "state": "Louisiana", "stateAbbr": "LA", "primaryCity": "Baton Rouge", "timeZone": "America/Chicago" },
  { "areaCode": "318", "state": "Louisiana", "stateAbbr": "LA", "primaryCity": "Shreveport", "timeZone": "America/Chicago" },
  { "areaCode": "337", "state": "Louisiana", "stateAbbr": "LA", "primaryCity": "Lake Charles", "timeZone": "America/Chicago" },
  { "areaCode": "504", "state": "Louisiana", "stateAbbr": "LA", "primaryCity": "New Orleans", "timeZone": "America/Chicago" },
  { "areaCode": "985", "state": "Louisiana", "stateAbbr": "LA", "primaryCity": "Houma", "timeZone": "America/Chicago" },

  // Maine
  { "areaCode": "207", "state": "Maine", "stateAbbr": "ME", "primaryCity": "", "timeZone": "America/New_York" },

  // Maryland
  { "areaCode": "240", "state": "Maryland", "stateAbbr": "MD", "primaryCity": "Rockville", "timeZone": "America/New_York" },
  { "areaCode": "301", "state": "Maryland", "stateAbbr": "MD", "primaryCity": "Rockville", "timeZone": "America/New_York" },
  { "areaCode": "410", "state": "Maryland", "stateAbbr": "MD", "primaryCity": "Baltimore", "timeZone": "America/New_York" },
  { "areaCode": "443", "state": "Maryland", "stateAbbr": "MD", "primaryCity": "Baltimore", "timeZone": "America/New_York" },
  { "areaCode": "667", "state": "Maryland", "stateAbbr": "MD", "primaryCity": "Baltimore", "timeZone": "America/New_York" },

  // Massachusetts
  { "areaCode": "339", "state": "Massachusetts", "stateAbbr": "MA", "primaryCity": "Waltham", "timeZone": "America/New_York" },
  { "areaCode": "351", "state": "Massachusetts", "stateAbbr": "MA", "primaryCity": "Lowell", "timeZone": "America/New_York" },
  { "areaCode": "413", "state": "Massachusetts", "stateAbbr": "MA", "primaryCity": "Springfield", "timeZone": "America/New_York" },
  { "areaCode": "508", "state": "Massachusetts", "stateAbbr": "MA", "primaryCity": "Worcester", "timeZone": "America/New_York" },
  { "areaCode": "617", "state": "Massachusetts", "stateAbbr": "MA", "primaryCity": "Boston", "timeZone": "America/New_York" },
  { "areaCode": "774", "state": "Massachusetts", "stateAbbr": "MA", "primaryCity": "Worcester", "timeZone": "America/New_York" },
  { "areaCode": "781", "state": "Massachusetts", "stateAbbr": "MA", "primaryCity": "Waltham", "timeZone": "America/New_York" },
  { "areaCode": "857", "state": "Massachusetts", "stateAbbr": "MA", "primaryCity": "Boston", "timeZone": "America/New_York" },
  { "areaCode": "978", "state": "Massachusetts", "stateAbbr": "MA", "primaryCity": "Lowell", "timeZone": "America/New_York" },

  // Michigan
  { "areaCode": "231", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Muskegon", "timeZone": "America/Detroit" },
  { "areaCode": "248", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Troy", "timeZone": "America/Detroit" },
  { "areaCode": "269", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Kalamazoo", "timeZone": "America/Detroit" },
  { "areaCode": "313", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Detroit", "timeZone": "America/Detroit" },
  { "areaCode": "517", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Lansing", "timeZone": "America/Detroit" },
  { "areaCode": "586", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Warren", "timeZone": "America/Detroit" },
  { "areaCode": "616", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Grand Rapids", "timeZone": "America/Detroit" },
  { "areaCode": "734", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Ann Arbor", "timeZone": "America/Detroit" },
  { "areaCode": "810", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Flint", "timeZone": "America/Detroit" },
  { "areaCode": "906", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Marquette", "timeZone": "America/Detroit" },
  { "areaCode": "947", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Troy", "timeZone": "America/Detroit" },
  { "areaCode": "989", "state": "Michigan", "stateAbbr": "MI", "primaryCity": "Saginaw", "timeZone": "America/Detroit" },

  // Minnesota
  { "areaCode": "218", "state": "Minnesota", "stateAbbr": "MN", "primaryCity": "Duluth", "timeZone": "America/Chicago" },
  { "areaCode": "320", "state": "Minnesota", "stateAbbr": "MN", "primaryCity": "St. Cloud", "timeZone": "America/Chicago" },
  { "areaCode": "507", "state": "Minnesota", "stateAbbr": "MN", "primaryCity": "Rochester", "timeZone": "America/Chicago" },
  { "areaCode": "612", "state": "Minnesota", "stateAbbr": "MN", "primaryCity": "Minneapolis", "timeZone": "America/Chicago" },
  { "areaCode": "651", "state": "Minnesota", "stateAbbr": "MN", "primaryCity": "St. Paul", "timeZone": "America/Chicago" },
  { "areaCode": "763", "state": "Minnesota", "stateAbbr": "MN", "primaryCity": "Brooklyn Park", "timeZone": "America/Chicago" },
  { "areaCode": "952", "state": "Minnesota", "stateAbbr": "MN", "primaryCity": "Bloomington", "timeZone": "America/Chicago" },

  // Mississippi
  { "areaCode": "228", "state": "Mississippi", "stateAbbr": "MS", "primaryCity": "Gulfport", "timeZone": "America/Chicago" },
  { "areaCode": "601", "state": "Mississippi", "stateAbbr": "MS", "primaryCity": "Jackson", "timeZone": "America/Chicago" },
  { "areaCode": "662", "state": "Mississippi", "stateAbbr": "MS", "primaryCity": "Tupelo", "timeZone": "America/Chicago" },
  { "areaCode": "769", "state": "Mississippi", "stateAbbr": "MS", "primaryCity": "Jackson", "timeZone": "America/Chicago" },

  // Missouri
  { "areaCode": "314", "state": "Missouri", "stateAbbr": "MO", "primaryCity": "Saint Louis", "timeZone": "America/Chicago" },
  { "areaCode": "417", "state": "Missouri", "stateAbbr": "MO", "primaryCity": "Joplin", "timeZone": "America/Chicago" },
  { "areaCode": "573", "state": "Missouri", "stateAbbr": "MO", "primaryCity": "Columbia", "timeZone": "America/Chicago" },
  { "areaCode": "636", "state": "Missouri", "stateAbbr": "MO", "primaryCity": "St. Charles", "timeZone": "America/Chicago" },
  { "areaCode": "660", "state": "Missouri", "stateAbbr": "MO", "primaryCity": "Warrensburg", "timeZone": "America/Chicago" },
  { "areaCode": "816", "state": "Missouri", "stateAbbr": "MO", "primaryCity": "Kansas City", "timeZone": "America/Chicago" },
  { "areaCode": "557", "state": "Missouri", "stateAbbr": "MO", "primaryCity": "Saint Louis", "timeZone": "America/Chicago" },
  { "areaCode": "975", "state": "Missouri", "stateAbbr": "MO", "primaryCity": "Kansas City", "timeZone": "America/Chicago" },

  // Montana
  { "areaCode": "406", "state": "Montana", "stateAbbr": "MT", "primaryCity": "", "timeZone": "America/Denver" },

  // Nebraska
  { "areaCode": "308", "state": "Nebraska", "stateAbbr": "NE", "primaryCity": "Grand Island", "timeZone": "America/Chicago" },
  { "areaCode": "402", "state": "Nebraska", "stateAbbr": "NE", "primaryCity": "Lincoln", "timeZone": "America/Chicago" },
  { "areaCode": "531", "state": "Nebraska", "stateAbbr": "NE", "primaryCity": "Omaha", "timeZone": "America/Chicago" },

  // Nevada
  { "areaCode": "702", "state": "Nevada", "stateAbbr": "NV", "primaryCity": "Las Vegas", "timeZone": "America/Los_Angeles" },
  { "areaCode": "725", "state": "Nevada", "stateAbbr": "NV", "primaryCity": "Las Vegas", "timeZone": "America/Los_Angeles" },
  { "areaCode": "775", "state": "Nevada", "stateAbbr": "NV", "primaryCity": "Reno", "timeZone": "America/Los_Angeles" },

  // New Hampshire
  { "areaCode": "603", "state": "New Hampshire", "stateAbbr": "NH", "primaryCity": "", "timeZone": "America/New_York" },

  // New Jersey
  { "areaCode": "201", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "Hackensack", "timeZone": "America/New_York" },
  { "areaCode": "551", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "Hackensack", "timeZone": "America/New_York" },
  { "areaCode": "609", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "Atlantic City", "timeZone": "America/New_York" },
  { "areaCode": "732", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "New Brunswick", "timeZone": "America/New_York" },
  { "areaCode": "848", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "New Brunswick", "timeZone": "America/New_York" },
  { "areaCode": "856", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "Camden", "timeZone": "America/New_York" },
  { "areaCode": "862", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "Newark", "timeZone": "America/New_York" },
  { "areaCode": "908", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "Elizabeth", "timeZone": "America/New_York" },
  { "areaCode": "973", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "Newark", "timeZone": "America/New_York" },
  { "areaCode": "640", "state": "New Jersey", "stateAbbr": "NJ", "primaryCity": "Atlantic City", "timeZone": "America/New_York" },

  // New Mexico
  { "areaCode": "505", "state": "New Mexico", "stateAbbr": "NM", "primaryCity": "Albuquerque", "timeZone": "America/Denver" },
  { "areaCode": "575", "state": "New Mexico", "stateAbbr": "NM", "primaryCity": "Las Cruces", "timeZone": "America/Denver" },

  // New York
  { "areaCode": "212", "state": "New York", "stateAbbr": "NY", "primaryCity": "New York City - Manhattan", "timeZone": "America/New_York" },
  { "areaCode": "315", "state": "New York", "stateAbbr": "NY", "primaryCity": "Syracuse", "timeZone": "America/New_York" },
  { "areaCode": "332", "state": "New York", "stateAbbr": "NY", "primaryCity": "Manhattan", "timeZone": "America/New_York" },
  { "areaCode": "347", "state": "New York", "stateAbbr": "NY", "primaryCity": "Bronx", "timeZone": "America/New_York" },
  { "areaCode": "516", "state": "New York", "stateAbbr": "NY", "primaryCity": "Hempstead", "timeZone": "America/New_York" },
  { "areaCode": "518", "state": "New York", "stateAbbr": "NY", "primaryCity": "Albany", "timeZone": "America/New_York" },
  { "areaCode": "585", "state": "New York", "stateAbbr": "NY", "primaryCity": "Rochester", "timeZone": "America/New_York" },
  { "areaCode": "607", "state": "New York", "stateAbbr": "NY", "primaryCity": "Elmira", "timeZone": "America/New_York" },
  { "areaCode": "631", "state": "New York", "stateAbbr": "NY", "primaryCity": "Brentwood", "timeZone": "America/New_York" },
  { "areaCode": "646", "state": "New York", "stateAbbr": "NY", "primaryCity": "Manhattan", "timeZone": "America/New_York" },
  { "areaCode": "716", "state": "New York", "stateAbbr": "NY", "primaryCity": "Buffalo", "timeZone": "America/New_York" },
  { "areaCode": "718", "state": "New York", "stateAbbr": "NY", "primaryCity": "Bronx", "timeZone": "America/New_York" },
  { "areaCode": "845", "state": "New York", "stateAbbr": "NY", "primaryCity": "Poughkeepsie", "timeZone": "America/New_York" },
  { "areaCode": "914", "state": "New York", "stateAbbr": "NY", "primaryCity": "Westchester", "timeZone": "America/New_York" },
  { "areaCode": "917", "state": "New York", "stateAbbr": "NY", "primaryCity": "New York City", "timeZone": "America/New_York" },
  { "areaCode": "929", "state": "New York", "stateAbbr": "NY", "primaryCity": "Bronx", "timeZone": "America/New_York" },
  { "areaCode": "680", "state": "New York", "stateAbbr": "NY", "primaryCity": "Syracuse", "timeZone": "America/New_York" },
  { "areaCode": "838", "state": "New York", "stateAbbr": "NY", "primaryCity": "Albany", "timeZone": "America/New_York" },
  { "areaCode": "934", "state": "New York", "stateAbbr": "NY", "primaryCity": "Brentwood", "timeZone": "America/New_York" },

  // North Carolina
  { "areaCode": "252", "state": "North Carolina", "stateAbbr": "NC", "primaryCity": "Greenville", "timeZone": "America/New_York" },
  { "areaCode": "336", "state": "North Carolina", "stateAbbr": "NC", "primaryCity": "Greensboro", "timeZone": "America/New_York" },
  { "areaCode": "704", "state": "North Carolina", "stateAbbr": "NC", "primaryCity": "Charlotte", "timeZone": "America/New_York" },
  { "areaCode": "743", "state": "North Carolina", "stateAbbr": "NC", "primaryCity": "Greensboro", "timeZone": "America/New_York" },
  { "areaCode": "828", "state": "North Carolina", "stateAbbr": "NC", "primaryCity": "Asheville", "timeZone": "America/New_York" },
  { "areaCode": "910", "state": "North Carolina", "stateAbbr": "NC", "primaryCity": "Fayetteville", "timeZone": "America/New_York" },
  { "areaCode": "919", "state": "North Carolina", "stateAbbr": "NC", "primaryCity": "Raleigh", "timeZone": "America/New_York" },
  { "areaCode": "980", "state": "North Carolina", "stateAbbr": "NC", "primaryCity": "Charlotte", "timeZone": "America/New_York" },
  { "areaCode": "984", "state": "North Carolina", "stateAbbr": "NC", "primaryCity": "Raleigh", "timeZone": "America/New_York" },

  // North Dakota
  { "areaCode": "701", "state": "North Dakota", "stateAbbr": "ND", "primaryCity": "", "timeZone": "America/Chicago" },

  // Ohio
  { "areaCode": "216", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Cleveland", "timeZone": "America/New_York" },
  { "areaCode": "234", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Akron", "timeZone": "America/New_York" },
  { "areaCode": "330", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Akron", "timeZone": "America/New_York" },
  { "areaCode": "419", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Toledo", "timeZone": "America/New_York" },
  { "areaCode": "440", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Willoughby", "timeZone": "America/New_York" },
  { "areaCode": "513", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Cincinnati", "timeZone": "America/New_York" },
  { "areaCode": "567", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Toledo", "timeZone": "America/New_York" },
  { "areaCode": "614", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Columbus", "timeZone": "America/New_York" },
  { "areaCode": "740", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Portsmouth", "timeZone": "America/New_York" },
  { "areaCode": "937", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Dayton", "timeZone": "America/New_York" },
  { "areaCode": "380", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Columbus", "timeZone": "America/New_York" },
  { "areaCode": "283", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Cincinnati", "timeZone": "America/New_York" },
  { "areaCode": "326", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Dayton", "timeZone": "America/New_York" },
  { "areaCode": "436", "state": "Ohio", "stateAbbr": "OH", "primaryCity": "Willoughby", "timeZone": "America/New_York" },

  // Oklahoma
  { "areaCode": "405", "state": "Oklahoma", "stateAbbr": "OK", "primaryCity": "Oklahoma City", "timeZone": "America/Chicago" },
  { "areaCode": "539", "state": "Oklahoma", "stateAbbr": "OK", "primaryCity": "Tulsa", "timeZone": "America/Chicago" },
  { "areaCode": "580", "state": "Oklahoma", "stateAbbr": "OK", "primaryCity": "Lawton", "timeZone": "America/Chicago" },
  { "areaCode": "918", "state": "Oklahoma", "stateAbbr": "OK", "primaryCity": "Tulsa", "timeZone": "America/Chicago" },
  { "areaCode": "572", "state": "Oklahoma", "stateAbbr": "OK", "primaryCity": "Oklahoma City", "timeZone": "America/Chicago" },

  // Oregon (state has PST majority; 458/541 span MST/PST; use first listed)
  { "areaCode": "458", "state": "Oregon", "stateAbbr": "OR", "primaryCity": "Eugene", "timeZone": "America/Denver" },
  { "areaCode": "503", "state": "Oregon", "stateAbbr": "OR", "primaryCity": "Portland", "timeZone": "America/Los_Angeles" },
  { "areaCode": "541", "state": "Oregon", "stateAbbr": "OR", "primaryCity": "Eugene", "timeZone": "America/Denver" },
  { "areaCode": "971", "state": "Oregon", "stateAbbr": "OR", "primaryCity": "Portland", "timeZone": "America/Los_Angeles" },

  // Pennsylvania
  { "areaCode": "215", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Philadelphia", "timeZone": "America/New_York" },
  { "areaCode": "267", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Philadelphia", "timeZone": "America/New_York" },
  { "areaCode": "272", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Williamsport", "timeZone": "America/New_York" },
  { "areaCode": "412", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Pittsburgh", "timeZone": "America/New_York" },
  { "areaCode": "484", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Allentown", "timeZone": "America/New_York" },
  { "areaCode": "570", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Scranton", "timeZone": "America/New_York" },
  { "areaCode": "610", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Allentown", "timeZone": "America/New_York" },
  { "areaCode": "717", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Harrisburg", "timeZone": "America/New_York" },
  { "areaCode": "724", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Greensburg", "timeZone": "America/New_York" },
  { "areaCode": "814", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Erie", "timeZone": "America/New_York" },
  { "areaCode": "878", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Pittsburgh", "timeZone": "America/New_York" },
  { "areaCode": "835", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Allentown", "timeZone": "America/New_York" },
  { "areaCode": "582", "state": "Pennsylvania", "stateAbbr": "PA", "primaryCity": "Erie", "timeZone": "America/New_York" },

  // Rhode Island
  { "areaCode": "401", "state": "Rhode Island", "stateAbbr": "RI", "primaryCity": "", "timeZone": "America/New_York" },

  // South Carolina
  { "areaCode": "803", "state": "South Carolina", "stateAbbr": "SC", "primaryCity": "Columbia", "timeZone": "America/New_York" },
  { "areaCode": "843", "state": "South Carolina", "stateAbbr": "SC", "primaryCity": "Charleston", "timeZone": "America/New_York" },
  { "areaCode": "864", "state": "South Carolina", "stateAbbr": "SC", "primaryCity": "Greenville", "timeZone": "America/New_York" },
  { "areaCode": "854", "state": "South Carolina", "stateAbbr": "SC", "primaryCity": "Charleston", "timeZone": "America/New_York" },
  { "areaCode": "839", "state": "South Carolina", "stateAbbr": "SC", "primaryCity": "Columbia", "timeZone": "America/New_York" },

  // South Dakota
  { "areaCode": "605", "state": "South Dakota", "stateAbbr": "SD", "primaryCity": "", "timeZone": "America/Chicago" },

  // Tennessee
  { "areaCode": "423", "state": "Tennessee", "stateAbbr": "TN", "primaryCity": "Chattanooga", "timeZone": "America/New_York" },
  { "areaCode": "615", "state": "Tennessee", "stateAbbr": "TN", "primaryCity": "Nashville", "timeZone": "America/Chicago" },
  { "areaCode": "629", "state": "Tennessee", "stateAbbr": "TN", "primaryCity": "Nashville", "timeZone": "America/Chicago" },
  { "areaCode": "731", "state": "Tennessee", "stateAbbr": "TN", "primaryCity": "Jackson", "timeZone": "America/Chicago" },
  { "areaCode": "865", "state": "Tennessee", "stateAbbr": "TN", "primaryCity": "Knoxville", "timeZone": "America/New_York" },
  { "areaCode": "901", "state": "Tennessee", "stateAbbr": "TN", "primaryCity": "Memphis", "timeZone": "America/Chicago" },
  { "areaCode": "931", "state": "Tennessee", "stateAbbr": "TN", "primaryCity": "Clarksville", "timeZone": "America/New_York" },

  // Texas
  { "areaCode": "210", "state": "Texas", "stateAbbr": "TX", "primaryCity": "San Antonio", "timeZone": "America/Chicago" },
  { "areaCode": "214", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Dallas", "timeZone": "America/Chicago" },
  { "areaCode": "254", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Waco", "timeZone": "America/Chicago" },
  { "areaCode": "281", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Houston", "timeZone": "America/Chicago" },
  { "areaCode": "325", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Abilene", "timeZone": "America/Chicago" },
  { "areaCode": "346", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Houston", "timeZone": "America/Chicago" },
  { "areaCode": "361", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Corpus Christi", "timeZone": "America/Chicago" },
  { "areaCode": "409", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Galveston", "timeZone": "America/Chicago" },
  { "areaCode": "430", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Longview", "timeZone": "America/Chicago" },
  { "areaCode": "432", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Midland", "timeZone": "America/Chicago" },
  { "areaCode": "469", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Dallas", "timeZone": "America/Chicago" },
  { "areaCode": "512", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Austin", "timeZone": "America/Chicago" },
  { "areaCode": "682", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Fort Worth", "timeZone": "America/Chicago" },
  { "areaCode": "713", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Houston", "timeZone": "America/Chicago" },
  { "areaCode": "737", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Houston", "timeZone": "America/Chicago" },
  { "areaCode": "806", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Amarillo", "timeZone": "America/Chicago" },
  { "areaCode": "817", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Fort Worth", "timeZone": "America/Chicago" },
  { "areaCode": "830", "state": "Texas", "stateAbbr": "TX", "primaryCity": "New Braunfels", "timeZone": "America/Chicago" },
  { "areaCode": "832", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Houston", "timeZone": "America/Chicago" },
  { "areaCode": "903", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Longview", "timeZone": "America/Chicago" },
  { "areaCode": "915", "state": "Texas", "stateAbbr": "TX", "primaryCity": "El Paso", "timeZone": "America/Chicago" },
  { "areaCode": "936", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Conroe", "timeZone": "America/Chicago" },
  { "areaCode": "940", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Wichita Falls", "timeZone": "America/Chicago" },
  { "areaCode": "956", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Brownsville", "timeZone": "America/Chicago" },
  { "areaCode": "972", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Dallas", "timeZone": "America/Chicago" },
  { "areaCode": "979", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Bryan", "timeZone": "America/Chicago" },
  { "areaCode": "945", "state": "Texas", "stateAbbr": "TX", "primaryCity": "Dallas", "timeZone": "America/Chicago" },

  // Utah
  { "areaCode": "385", "state": "Utah", "stateAbbr": "UT", "primaryCity": "Salt Lake City", "timeZone": "America/Denver" },
  { "areaCode": "435", "state": "Utah", "stateAbbr": "UT", "primaryCity": "Logan", "timeZone": "America/Denver" },
  { "areaCode": "801", "state": "Utah", "stateAbbr": "UT", "primaryCity": "Salt Lake City", "timeZone": "America/Denver" },

  // Vermont
  { "areaCode": "802", "state": "Vermont", "stateAbbr": "VT", "primaryCity": "", "timeZone": "America/New_York" },

  // Virginia
  { "areaCode": "276", "state": "Virginia", "stateAbbr": "VA", "primaryCity": "Martinsville", "timeZone": "America/New_York" },
  { "areaCode": "434", "state": "Virginia", "stateAbbr": "VA", "primaryCity": "Lynchburg", "timeZone": "America/New_York" },
  { "areaCode": "540", "state": "Virginia", "stateAbbr": "VA", "primaryCity": "Roanoke", "timeZone": "America/New_York" },
  { "areaCode": "571", "state": "Virginia", "stateAbbr": "VA", "primaryCity": "Arlington", "timeZone": "America/New_York" },
  { "areaCode": "703", "state": "Virginia", "stateAbbr": "VA", "primaryCity": "Arlington", "timeZone": "America/New_York" },
  { "areaCode": "757", "state": "Virginia", "stateAbbr": "VA", "primaryCity": "Norfolk", "timeZone": "America/New_York" },
  { "areaCode": "804", "state": "Virginia", "stateAbbr": "VA", "primaryCity": "Richmond", "timeZone": "America/New_York" },
  { "areaCode": "686", "state": "Virginia", "stateAbbr": "VA", "primaryCity": "Richmond", "timeZone": "America/New_York" },
  { "areaCode": "948", "state": "Virginia", "stateAbbr": "VA", "primaryCity": "Norfolk", "timeZone": "America/New_York" },

  // Washington
  { "areaCode": "206", "state": "Washington", "stateAbbr": "WA", "primaryCity": "Seattle", "timeZone": "America/Los_Angeles" },
  { "areaCode": "253", "state": "Washington", "stateAbbr": "WA", "primaryCity": "Tacoma", "timeZone": "America/Los_Angeles" },
  { "areaCode": "360", "state": "Washington", "stateAbbr": "WA", "primaryCity": "Vancouver", "timeZone": "America/Los_Angeles" },
  { "areaCode": "425", "state": "Washington", "stateAbbr": "WA", "primaryCity": "Bellevue", "timeZone": "America/Los_Angeles" },
  { "areaCode": "509", "state": "Washington", "stateAbbr": "WA", "primaryCity": "Spokane", "timeZone": "America/Los_Angeles" },
  { "areaCode": "564", "state": "Washington", "stateAbbr": "WA", "primaryCity": "Vancouver", "timeZone": "America/Los_Angeles" },

  // West Virginia
  { "areaCode": "304", "state": "West Virginia", "stateAbbr": "WV", "primaryCity": "", "timeZone": "America/New_York" },
  { "areaCode": "681", "state": "West Virginia", "stateAbbr": "WV", "primaryCity": "", "timeZone": "America/New_York" },

  // Wisconsin
  { "areaCode": "262", "state": "Wisconsin", "stateAbbr": "WI", "primaryCity": "Waukesha", "timeZone": "America/Chicago" },
  { "areaCode": "414", "state": "Wisconsin", "stateAbbr": "WI", "primaryCity": "Milwaukee", "timeZone": "America/Chicago" },
  { "areaCode": "534", "state": "Wisconsin", "stateAbbr": "WI", "primaryCity": "Wausau", "timeZone": "America/Chicago" },
  { "areaCode": "608", "state": "Wisconsin", "stateAbbr": "WI", "primaryCity": "Madison", "timeZone": "America/Chicago" },
  { "areaCode": "715", "state": "Wisconsin", "stateAbbr": "WI", "primaryCity": "Eau Claire", "timeZone": "America/Chicago" },
  { "areaCode": "920", "state": "Wisconsin", "stateAbbr": "WI", "primaryCity": "Green Bay", "timeZone": "America/Chicago" },
  { "areaCode": "274", "state": "Wisconsin", "stateAbbr": "WI", "primaryCity": "Appleton", "timeZone": "America/Chicago" },

  // Wyoming
  { "areaCode": "307", "state": "Wyoming", "stateAbbr": "WY", "primaryCity": "", "timeZone": "America/Denver" },

  // US Territories
  { "areaCode": "787", "state": "Puerto Rico", "stateAbbr": "PR", "primaryCity": "", "timeZone": "America/Puerto_Rico" },
  { "areaCode": "939", "state": "Puerto Rico", "stateAbbr": "PR", "primaryCity": "", "timeZone": "America/Puerto_Rico" },
  { "areaCode": "340", "state": "U.S. Virgin Islands", "stateAbbr": "VI", "primaryCity": "", "timeZone": "America/St_Thomas" },
  { "areaCode": "670", "state": "Northern Marianas Islands", "stateAbbr": "MP", "primaryCity": "", "timeZone": "Pacific/Saipan" },
  { "areaCode": "671", "state": "Guam", "stateAbbr": "GU", "primaryCity": "", "timeZone": "Pacific/Guam" },
  { "areaCode": "684", "state": "American Samoa", "stateAbbr": "AS", "primaryCity": "", "timeZone": "Pacific/Pago_Pago" },

  // District-wide and other notes already included above (DC)

  // IMPORTANT: This MUST be the last entry in the array.
  // It serves as a fallback for unknown or unlisted area codes.
  { "areaCode": "unknown", "state": "Unknown Location", "stateAbbr": "XX", "primaryCity": "", "timeZone": "America/New_York" }
];

export default areaCodeData;
