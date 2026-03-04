import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

actor {
  public type PackageCategory = {
    #heritage;
    #desert;
    #luxury;
    #cultural;
  };

  public type TourPackage = {
    id : Nat;
    title : Text;
    description : Text;
    priceUSD : Nat;
    durationDays : Nat;
    category : PackageCategory;
    featured : Bool;
  };

  public type BookingStatus = {
    #pending;
    #confirmed;
    #cancelled;
  };

  public type Booking = {
    id : Nat;
    customerName : Text;
    email : Text;
    phone : Text;
    destinationName : Text;
    travelDate : Text;
    groupSize : Nat;
    specialRequests : ?Text;
    status : BookingStatus;
    submissionTimestamp : Int;
  };

  public type Testimonial = {
    id : Nat;
    clientName : Text;
    location : Text;
    reviewText : Text;
    starRating : Nat;
    avatarLabel : Text;
  };

  // Storage
  let packages = Map.empty<Nat, TourPackage>();
  let bookings = Map.empty<Nat, Booking>();
  let testimonials = Map.empty<Nat, Testimonial>();

  // Counters for IDs
  var packageCounter = 0;
  var bookingCounter = 0;
  var testimonialCounter = 0;

  // Seed initial testimonials
  let TESTIMONIAL_SEED_IDS : [Nat] = [0, 1, 2, 3, 4];
  let TESTIMONIAL_SEED_DATA : [(Text, Text, Text, Nat, Text)] = [
    ("Sarah Evans", "London, UK", "My Rajasthan experience was enchanting! The heritage forts and palaces took my breath away. Sandhi Tourism handled everything perfectly – highly recommend for history lovers.", 5, "SE"),
    ("Raj Sharma", "Delhi, India", "The Thar Desert safari was unforgettable. We rode camels, enjoyed local music, and the hospitality was fantastic. Thanks to the Sandhi team!", 5, "RS"),
    ("Emily Turner", "Sydney, AUS", "What a cultural journey! From Jaipur's colorful markets to peaceful temples, I loved every minute. The guides were very professional and knowledgeable.", 4, "ET"),
    ("Carla Muniz", "Barcelona, ESP", "Excellent service from start to finish. Our family felt safe and cared for on every excursion. The food recommendations were delicious too!", 5, "CM"),
    ("Magnus Bjorn", "Stockholm, SWE", "Smooth trip planning and responsive team. The camel trek was a bit shorter than expected, but it was an amazing overall experience. Great memories!", 4, "MB"),
  ];

  public shared ({ caller }) func initialize() : async () {
    if (testimonials.size() > 0) {
      Runtime.trap("Testimonials already initialized. Can only be seeded once!");
    };

    for (i in TESTIMONIAL_SEED_IDS.values()) {
      let (name, location, review, stars, avatar) = TESTIMONIAL_SEED_DATA[i];
      let testimonial : Testimonial = {
        id = i;
        clientName = name;
        location;
        reviewText = review;
        starRating = stars;
        avatarLabel = avatar;
      };
      testimonials.add(i, testimonial);
    };

    testimonialCounter := TESTIMONIAL_SEED_IDS.size();
  };

  public query ({ caller }) func getAllPackages() : async [TourPackage] {
    packages.values().toArray();
  };

  public query ({ caller }) func getPackage(id : Nat) : async TourPackage {
    switch (packages.get(id)) {
      case (?p) { p };
      case (null) { Runtime.trap("Package not found") };
    };
  };

  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public shared ({ caller }) func submitBooking(booking : {
    customerName : Text;
    email : Text;
    phone : Text;
    destinationName : Text;
    travelDate : Text;
    groupSize : Nat;
    specialRequests : ?Text;
  }) : async Nat {
    if (booking.customerName.isEmpty() or booking.email.isEmpty()) {
      Runtime.trap("Name and email are required.");
    };

    let newBooking : Booking = {
      id = bookingCounter;
      customerName = booking.customerName;
      email = booking.email;
      phone = booking.phone;
      destinationName = booking.destinationName;
      travelDate = booking.travelDate;
      groupSize = booking.groupSize;
      specialRequests = booking.specialRequests;
      status = #pending;
      submissionTimestamp = Time.now();
    };

    bookings.add(bookingCounter, newBooking);
    bookingCounter += 1;
    newBooking.id;
  };

  public shared ({ caller }) func addTestimonial(testimonial : {
    clientName : Text;
    location : Text;
    reviewText : Text;
    starRating : Nat;
    avatarLabel : Text;
  }) : async Nat {
    if (testimonial.starRating < 1 or testimonial.starRating > 5) {
      Runtime.trap("Star rating must be between 1 and 5");
    };

    let newTestimonial : Testimonial = {
      id = testimonialCounter;
      clientName = testimonial.clientName;
      location = testimonial.location;
      reviewText = testimonial.reviewText;
      starRating = testimonial.starRating;
      avatarLabel = testimonial.avatarLabel;
    };

    testimonials.add(testimonialCounter, newTestimonial);
    testimonialCounter += 1;
    newTestimonial.id;
  };

  public shared ({ caller }) func addTourPackage(pkg : {
    title : Text;
    description : Text;
    priceUSD : Nat;
    durationDays : Nat;
    category : PackageCategory;
    featured : Bool;
  }) : async Nat {
    let newPackage : TourPackage = {
      id = packageCounter;
      title = pkg.title;
      description = pkg.description;
      priceUSD = pkg.priceUSD;
      durationDays = pkg.durationDays;
      category = pkg.category;
      featured = pkg.featured;
    };

    packages.add(packageCounter, newPackage);
    packageCounter += 1;
    newPackage.id;
  };
};
