import Debug "mo:base/Debug";
import Text "mo:base/Text";

actor {
  var roomUrl : Text = "https://you.daily.co/hello";

  public query func getRoomUrl() : async Text {
    roomUrl
  };

  public query func healthCheck() : async Text {
    "ICLink backend is healthy!"
  };
}