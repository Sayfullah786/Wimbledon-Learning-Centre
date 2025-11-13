import ZohoWebform from "./ui/ZohoWebform";

const Ressources = () => {
  return (
    <section id="ressources" className="p-sec sm:pt-0! max-sm:mb-6">
      <div className="maxWSec mx-auto px-2 md:px-8 flex flex-col items-center gap-6 text-center">
        {/* Title */}
        <h1 className="font-bebas h1">
          Get Free Learning <span className="text-main">Resources</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 max-w-2xl text-sm sm:text-base">
          Sign up with your email to receive free Maths and English resources,
          tips from our expert tutors, and exclusive updates directly to your
          inbox.
        </p>

        <ZohoWebform />

        {/* Disclaimer */}
        <p className="text-xs text-gray-400">
          By subscribing, you agree to receive occasional emails from us. You
          can unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Ressources;
