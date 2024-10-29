
function About() {

  return (
    <div className="w-full bg-neutral min-h-[90vh]">
      <div className="container mx-auto flex flex-col font-bold pt-20 gap-10 items-center">
        <h1 className="text-2xl lg:text-3xl xl:text-5xl">
          We love{" "}
          <span className="px-4 py-2 rounded-2xl  bg-pink-600">comfy</span>
        </h1>
        <p className="text-sm lg:text-base xl:text-xl w-full lg:w-[50%]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore quae
          quam blanditiis vitae, dolor non eveniet ipsum voluptatibus, quia
          optio aut! Perferendis ipsa cumque ipsam nostrum reprehenderit ad illo
          sed officiis ea tempore! Similique eos minima sit porro, ratione
          aspernatur!
        </p>
      </div>
    </div>
);
}

export default About;
