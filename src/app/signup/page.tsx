/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  Button,
  Checkbox,
  Input,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import arrowBlack from "../assets/arrowBlack.svg";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Google from "../assets/google.svg";
import Facebook from "../assets/facebook.svg";
import Apple from "../assets/apple.svg";
import RegisterSucccess from "../components/RegisterSuccess";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

interface Form {
  name: string;
  email: string;
  password: string;
}

const Page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: Form) => {
    toast.loading("SignUp...", { id: "signup" });
    try {
      await auth?.signup(data.name, data.email, data.password);
      onOpen();
      toast.success("SignUpsuccessfully ", { id: "signup" });
    } catch (error) {
      toast.error("SignUp failed", { id: "signup" });
    }
  };

  return (
    <div className="h-screen layout-padding">
      <Link href="/login">
        <Button
          isIconOnly
          size="lg"
          radius="full"
          className="absolute top-2 text-3xl"
        >
          <Image
            src={arrowBlack}
            width={50}
            height={50}
            quality={50}
            className="mx-auto rounded-3xl w-8 h-8 rotate-180"
            alt="Picture of the author"
          />
        </Button>
      </Link>
      <div className="pt-20 flex flex-col">
        <h1 className="text-xl font-bold mb-4">Hello there 👋</h1>
        <p className=" text-sm text-gray-500 mb-14">
          Please enter you email & password to create an account
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="h-16 ">
            <Input
              {...register("name", {
                required: "Porfavor llene la vaina",
                pattern: {
                  message: "Formato inválido",
                  value: /^[a-zA-Z]+(?: [a-zA-Z]+)?$/g,
                },
              })}
              type="name"
              label="Your name"
              variant="underlined"
              labelPlacement="outside"
              placeholder="Enter your name"
            />
            {errors.name?.message}
          </div>
          <div className="h-16 mt-10">
            <Input
              {...register("email", {
                required: "Porfavor llene la vaina",
                pattern: {
                  message: "Formato inválido",
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
                },
              })}
              type="email"
              label="Your email"
              variant="underlined"
              labelPlacement="outside"
              placeholder="Enter your email"
            />
            {errors.email?.message}
          </div>
          <div className="h-16 mt-10">
            <Input
              {...register("password", {
                required: "Porfavor llene la vaina",
                pattern: {
                  message: "Formato inválido",
                  value: /^.{8,}$/,
                },
              })}
              type="password"
              label="Create password"
              variant="underlined"
              labelPlacement="outside"
              placeholder="Create your password"
            />
            {errors.password?.message}
          </div>

          <Checkbox className="mt-6">
            I agree to Chatbot_AI Public Agreement, Terms, & Privacy Policy.
          </Checkbox>

          <Button
            type="submit"
            size="lg"
            className=" !bg-principal text-white text-2xl mt-10 h-14 rounded-2xl font-bold "
          >
            Continue
          </Button>

          <div className="flex flex-row w-full justify-center gap-2 mt-4">
            <p className="font-semibold">Already have an account?</p>
            <Link href="/login" className="text-principal">
              Sign In
            </Link>
          </div>
          <p className="text-center text-lightGrey mt-10">or continue with</p>
          <div className="grid grid-cols-3 mt-10 mb-30">
            <Image
              src={Google}
              width={50}
              height={50}
              quality={50}
              className="mx-auto rounded-3xl w-8 h-8"
              alt="Picture of the author"
            />
            <Image
              src={Facebook}
              width={50}
              height={50}
              quality={50}
              className="mx-auto rounded-3xl w-8 h-8"
              alt="Picture of the author"
            />
            <Image
              src={Apple}
              width={50}
              height={50}
              quality={50}
              className="mx-auto rounded-3xl w-8 h-8"
              alt="Picture of the author"
            />
          </div>
        </form>
        <RegisterSucccess isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </div>
  );
};

export default Page;
