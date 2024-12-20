
function RegistrationSuccessful() {

  return (
    <div className='flex flex-col items-center bg-[var(--dark-color)] w-max justify-center py-4 px-8 rounded-md'>
        <div className="flex items-center gap-5">
            <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>Registration successful</h2>
        </div>

        <div className='flex gap-2'>
            <h2 className='text-[var(--w-color)] text-2xl pb-8 pt-4'>:</h2>
            <h2 className='text-[var(--w-color)] text-2xl pb-8 pt-4'>حديث رسول الله صلى الله عليه وسلم</h2>
        </div>

        <h2 className='text-[var(--w-color)] text-xl pb-8 pt-4' >"بدأ الإسلام غريباً وسيعود غريباً كما بدأ، فطوبى للغرباء."</h2>
        <h2 className='text-[var(--w-color)] text-xl pb-8 pt-4' >رواه مسلم.</h2>

        <h2 className='text-[var(--w-color)] text-3xl pb-8 pt-4'>You will be redirected to the home page</h2>
    </div>
  );
};

export default RegistrationSuccessful;
