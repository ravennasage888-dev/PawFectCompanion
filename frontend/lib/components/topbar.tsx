import React from "react";
import { MegaMenu, Navbar, Button } from "flowbite-react";
import { ROUTES, useRouter } from "../routes";

export function Topbar() {
  const { push } = useRouter();
  return (
    <MegaMenu className="border-b-0 shadow-sm sticky top-0 z-50 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between p-4 w-full">
        <Navbar.Brand className="cursor-pointer" onClick={() => push("/")}>
          <div className="mr-3 flex items-center gap-2">
            <div className="h-10 w-10 rounded-full flex items-center justify-center text-white text-xl shadow-md"
                 style={{ background: "linear-gradient(135deg,#f97316,#ea580c)" }}>
              🐾
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-extrabold tracking-tight" style={{ color: "#1f2937" }}>
                Pawfect <span style={{ color: "#ea580c" }}>Companions</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-gray-500 font-semibold">
                Find Your Perfect Furry Friend
              </span>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link onClick={() => push(ROUTES.LANDING_PAGE)} className="cursor-pointer font-semibold hover:text-orange-600">Home</Navbar.Link>
          <Navbar.Link onClick={() => push(ROUTES.PUPPIES)} className="cursor-pointer font-semibold hover:text-orange-600">Our Puppies</Navbar.Link>
          <Navbar.Link onClick={() => push(ROUTES.BREEDS)} className="cursor-pointer font-semibold hover:text-orange-600">Breeds</Navbar.Link>
          <Navbar.Link onClick={() => push(ROUTES.TESTIMONIALS)} className="cursor-pointer font-semibold hover:text-orange-600">Happy Families</Navbar.Link>
          <Navbar.Link onClick={() => push(ROUTES.ABOUT)} className="cursor-pointer font-semibold hover:text-orange-600">About Us</Navbar.Link>
          <div className="flex items-center gap-2 ml-2">
            <Button 
              color="gray" 
              className="font-semibold"
              onClick={() => push(ROUTES.LOGIN)}
            >
              Sign In
            </Button>
            <Button 
              className="font-bold text-white shadow-md hover:shadow-lg transition-all"
              style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", border: "none" }}
              onClick={() => push(ROUTES.CONTACT)}
            >
              🐾 Find My Puppy
            </Button>
          </div>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}