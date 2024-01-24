
const Note = ({ text }: { text: string }) => {
  return (
    <div className=" relative rounded-xl bg-cyan-700 p-4 max-w-[90vw] lg:max-w-[50%] overflow-hidden">
      <div className=" p-2 rounded-br-xl text-cyan-300  bg-cyan-900 absolute top-0 left-0">
        <p>note</p>
      </div>
      <p className="text-stone-100 text-xl mt-8">{text}</p>
    </div>
  );
};

export default Note;
