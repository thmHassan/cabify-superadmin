import { ErrorMessage, Field } from "formik";
import Password from "../../../../../../components/elements/CustomPassword/Password";

const SigninFormFields = () => {
  return (
    <>
      <div>
        <label
          htmlFor="Email"
          className="block text-sm sm:text-base lg:text-[18px] font-semibold leading-5 sm:leading-6 lg:leading-[25px] mb-1 sm:mb-[5px] text-[#363636]"
        >
          Email
        </label>
        <div>
          <div>
            <Field
              name="email"
              type="text"
              className="border-[1.2px] border-[#E0E0E0] focus:outline-none h-12 sm:h-14 lg:h-[56px] rounded-lg p-3 sm:p-3.5 lg:p-4 text-sm sm:text-base lg:text-[18px] font-semibold leading-5 sm:leading-6 w-full placeholder:text-[#9C9C9C]"
              placeholder="Enter your email"
              autoComplete="off"
            />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-500 text-xs sm:text-sm"
          />
        </div>
      </div>
      <div>
        <div>
          <label
            htmlFor="Password"
            className="block text-sm sm:text-base lg:text-[18px] font-semibold leading-5 sm:leading-6 lg:leading-[25px] mb-1 sm:mb-[5px] text-[#363636]"
          >
            Password
          </label>
          <div>
            <Password
              name="password"
              className="border-[1.2px] border-[#E0E0E0] focus:outline-none h-12 sm:h-14 lg:h-[56px] rounded-lg p-3 sm:p-3.5 lg:p-4 text-sm sm:text-base lg:text-[18px] font-semibold leading-5 sm:leading-6 w-full placeholder:text-[#9C9C9C]"
              placeholder="Enter your password"
              autoComplete="off"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs sm:text-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninFormFields;
