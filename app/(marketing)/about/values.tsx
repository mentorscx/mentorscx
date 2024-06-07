export default function CoreValues() {
  return (
    <section id="core-values">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-16 border-t border-gray-200">
          <h3 className="h3 mb-3 text-center">Our core values</h3>
          {/* Items */}
          <div className="relative max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-start md:max-w-2xl lg:max-w-none">
            <div
              className="absolute top-1/2 w-full h-1 bg-gradient-to-r from-blue-500 to-teal-300 hidden lg:block"
              aria-hidden="true"
            ></div>

            {/* 1st item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold mb-3">
                1
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Community-focused
              </h4>
              <p className="text-gray-600 text-center">
                We believe in the power of collaboration, shared knowledge, and
                collective support. By fostering a community-focused
                environment, we aim to create a space where every member
                thrives, learns, and succeeds together.
              </p>
            </div>

            {/* 2nd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold mb-3">
                2
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Lifelong Learner
              </h4>
              <p className="text-gray-600 text-center">
                Our dedication to continuous education and exploration ensures
                that our community remains at the forefront of industry trends,
                enabling us to provide innovative solutions and valuable
                insights to our members.
              </p>
            </div>

            {/* 3rd item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold mb-3">
                3
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Humbleness
              </h4>
              <p className="text-gray-600 text-center">
                We recognize that every voice within our community holds
                significance, and we approach each interaction with respect and
                openness. In embracing humbleness, we create an environment
                where ideas flourish, and collaboration knows no bounds.
              </p>
            </div>

            {/* 4th item */}
            <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-xl h-full">
              <div className="flex justify-center items-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold mb-3">
                4
              </div>
              <h4 className="text-xl font-bold leading-snug tracking-tight mb-1">
                Own your growth
              </h4>
              <p className="text-gray-600 text-center">
                Every member is encouraged to take initiative, embrace
                challenges, and lead with a mindset of continuous improvement.
                By fostering a culture of proactive leadership, we ensure that
                our community not only adapts to change but thrives in it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
