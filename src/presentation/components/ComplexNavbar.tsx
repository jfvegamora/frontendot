/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signal } from "@preact/signals-react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  UserCircleIcon,
  // Square3Stack3DIcon,
  // ChevronDownIcon,
  PowerIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";
import { AppStore, useAppDispatch, useAppSelector } from "../../redux/store";
import { logout } from "../../redux/slices/userSlice";
import imagen from "../../assets/lentes02.jpg";
import { clearLocalStorage } from "../../redux/slices/ListBoxTipoSlice";
import avatarImage from "../../assets/avatar01.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faGlasses,
  faWarehouse,
  faGears,
  faWallet,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export const strNavTitle = signal("");
// profile menu component

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const closeMenu = () => setIsMenuOpen(false);
  const userState = useAppSelector((store: AppStore) => store.user);
  let profileMenuItems = [];

  const userAgent = navigator.userAgent;
  const isMobile = /Mobi/.test(userAgent);

  if (isMobile) {
    profileMenuItems = [
      {
        label: "Cerrar Sesión",
        icon: PowerIcon,
        action: () => {},
      },
    ];
  } else {
    profileMenuItems = [
      {
        label: `Mi Perfil`,
        icon: UserCircleIcon,
        action: "/profile",
      },
      {
        label: "Cerrar Sesión",
        icon: PowerIcon,
        action: () => {},
      },
    ];
  }

  return (
    <div className="right-0 absolute flex mx-4 translate-x-8 justify-right items-center">
      {userState && !isMobile && (
        <p className="m-auto font-menu pr-1">{userState.nombre}</p>
      )}

      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-blue-500 p-0.5"
              src={avatarImage}
            />
            <FontAwesomeIcon icon={faChevronDown} />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, action }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={() => {
                  if (typeof action === "string") {
                    console.log("action:", action);
                    return navigate(action);
                  }
                  if (typeof action === "function") {
                    toast.success("Sesion cerrada");
                    dispatch(logout());
                    dispatch(clearLocalStorage());
                    navigate("/login");
                  }
                  closeMenu();
                }}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="text-[1vw]"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
      {isMobile && <p className="m-auto font-menu pr-1">{userState.nombre}</p>}
    </div>
  );
}

const navListMenuOT = [
  {
    title: "OT Diaria",
    link: "/ot",
    id: "28",
  },
  {
    title: "OT Archivo",
    link: "/othistorica",
    id: "1",
  },
  {
    title: "Beneficiarios / Clientes",
    link: "/clientes",
    id: "2",
  },
  {
    title: "Bitácora",
    link: "/bitacora",
    id: "44",
  },
  {
    title: "Pizarra Reportes",
    link: "/pizarrareportes",
    id: "47",
  },
];

const subMenuParametrizacionBodega = [
  {
    title: "Asignación Armazones -> Muestrarios",
    link: "/muestrariosarmazones",
    id: "16",
  },
  {
    title: "Asignación Armazones -> Vitrinas",
    link: "/vitrinasarmazones",
    id: "35",
  },
  {
    title: "Asignación de Accesorios",
    link: "/proyectoaccesorios",
    id: "30",
  },
];

const subMenuKardexBodega = [
  {
    title: "Kardex de Armazones",
    link: "/kardexarmazones",
    id: "6",
  },
  {
    title: "Kardex de Cristales",
    link: "/kardexcristales",
    id: "8",
  },
  {
    title: "Kardex de Accesorios",
    link: "/kardexaccesorios",
    id: "10",
  },
];

const navListMenuBodega = [
  {
    title: "Almacenes",
    link: "/almacenes",
    id: "11",
  },
  {
    title: "Armazones",
    link: "/armazones",
    id: "5",
  },
  {
    title: "Cristales",
    link: "/cristales",
    id: "7",
  },
  {
    title: "Accesorios",
    link: "/accesorios",
    id: "9",
  },
  {
    title: "Marcas",
    link: "/marcas",
    id: "12",
  },
  {
    title: "Proveedores",
    link: "/proveedores",
    id: "13",
  },
  {
    title: "Informe Cristales",
    link: "/informecristales",
    id: "46",
  },
];

const subMenuParametrizacion = [
  {
    title: "Parametrización de Cristales",
    link: "/proyectocristales",
    id: "17",
  },
  {
    title: "Parametrización de Puntos de Venta",
    link: "/puntosventa",
    id: "4",
  },
  {
    title: "Parametrización de Destinos",
    link: "/proyectodestinos",
    id: "18",
  },
  {
    title: "Parametrización de Establecimientos",
    link: "/establecimientos",
    id: "3",
  },
  {
    title: "Parametrización de Usuarios",
    link: "/proyectousuarios",
    id: "34",
  },
  {
    title: "Parametrización de Muestrarios",
    link: "/muestrarios",
    id: "36",
  },
  {
    title: "Parametrización de Vitrinas",
    link: "/vitrinas",
    id: "37",
  },
  {
    title: "Parametrización de Tratamiento Adicional",
    link: "/proyectotratamadic",
    id: "43",
  },
];

const subMenuMotivosOT = [
  {
    title: "Motivos de OT Anulada",
    link: "/motivootanulada",
    id: "41",
  },
  {
    title: "Motivos de OT Derivada",
    link: "/motivootderivada",
    id: "29",
  },
  {
    title: "Motivos de OT Pendiente",
    link: "/motivootpendiente",
    id: "39",
  },
  {
    title: "Motivos de OT Post-venta",
    link: "/motivootgarantia",
    id: "40",
  },
];

const navListMenuProyectos = [
  {
    title: "Proyectos",
    link: "/proyectos",
    id: "15",
  },
  {
    title: "Documentos",
    link: "/proyectodocum",
    id: "38",
  },
  {
    title: "Reserva de Armazones",
    link: "/reservaarmazones",
    id: "42",
  },
  {
    title: "Tratamientos Adicionales",
    link: "/tratamientosadicionales",
    id: "45",
  },
  {
    title: "Oftalmólogos",
    link: "/oftalmologos",
    id: "21",
  },
  {
    title: "Mandantes",
    link: "/mandantes",
    id: "14",
  },
  {
    title: "Empresas",
    link: "/empresas",
    id: "27",
  },
];

const navListMenuSistema = [
  {
    title: "Usuarios",
    link: "/usuarios",
    id: "24",
  },
  {
    title: "Cargos",
    link: "/cargos",
    id: "22",
  },
  {
    title: "Funcionalidades",
    link: "/funcionalidades",
    id: "23",
  },
  {
    title: "Permisos de Usuario",
    link: "/permisos",
    id: "26",
  },
  {
    title: "Perfiles de Cargo",
    link: "/perfiles",
    id: "25",
  },
];

const NavListMenuOT = React.memo(function NavListMenuOT({
  userPermission,
}: {
  userPermission: string[];
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // const triggers = {
  //   onMouseEnter: () => setIsMenuOpen(true),
  //   onMouseLeave: () => setIsMenuOpen(false),
  // };

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, []);

  const renderItems = navListMenuOT.map(({ title, link, id }) => {
    const hasPermission = userPermission.includes(id as any);
    return (
      <MenuItem
        key={id}
        className={`flex items-center gap-2 rounded ${
          hasPermission ? "" : "text-gray-400 cursor-not-allowed"
        }`}
        onClick={() => {
          if (hasPermission) {
            strNavTitle.value = title;
            navigate(link);
          }
        }}
      >
        <Typography
          as="a"
          variant="h6"
          className={`text-[1vw] ${hasPermission ? "" : "text-gray-400"}`}
        >
          {title}
        </Typography>
      </MenuItem>
    );
  });

  return (
    <div className="w-[15vw]">
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler onClick={toggleMenu}>
          <Typography as="a" href="#" variant="h4" className="text-[1vw]">
            <MenuItem
              // {...triggers}
              className="hidden items-center gap-2 font-menu lg:flex lg:rounded-full"
            >
              <FontAwesomeIcon icon={faGlasses} size="xl" /> VENTAS{" "}
              <FontAwesomeIcon
                icon={faChevronDown}
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          // {...triggers}
          className="hidden w-[30vw]  grid-cols-7  gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <img className="imgNavBar" src={imagen}></img>
            {/* <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" /> */}
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        {/* <Square3Stack3DIcon className="h-[18px] w-[18px]" /> OT{" "} */}
        <FontAwesomeIcon icon={faGlasses} /> VENTAS{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </div>
  );
});

function NavListMenuBodega({ userPermission }: { userPermission: string[] }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openMenuKardexBodega, setOpenMenuKardexBodega] = useState(false);
  const navigate = useNavigate();

  // const triggers = {
  //   onMouseEnter: () => setIsMenuOpen(true),
  //   onMouseLeave: () => setIsMenuOpen(false),
  // };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderItems = navListMenuBodega.map(
    ({ title, link, id, subMenu }: any) => {
      const hasPermission = userPermission.includes(id as any);

      const renderSubMenu = subMenu
        ? subMenu.map(
            ({
              title: subMenuTitle,
              link: subMenuLink,
              id: subMenuId,
            }: any) => {
              const subMenuHasPermission = userPermission.includes(subMenuId);

              return (
                <MenuItem
                  key={id}
                  className={`flex  items-center gap-2 rounded ${
                    subMenuHasPermission
                      ? ""
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (subMenuHasPermission) {
                      navigate(subMenuLink);
                      strNavTitle.value = subMenuTitle;
                    }
                  }}
                >
                  <Typography
                    as="span"
                    variant="h6"
                    className={`!text-[1vw] ${
                      subMenuHasPermission ? "" : "text-gray-400"
                    }`}
                  >
                    {subMenuTitle}
                  </Typography>
                  {renderSubMenu && renderSubMenu.length > 0 && (
                    <Menu open={isMenuOpen} handler={setIsMenuOpen}>
                      <MenuHandler>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="h-3 w-3"
                        />
                      </MenuHandler>
                      <MenuList className="p-1">{renderSubMenu}</MenuList>
                    </Menu>
                  )}
                </MenuItem>
              );
            }
          )
        : null;

      return (
        <div key={id} className="">
          <MenuItem
            className={`flex items-center  gap-2 rounded ${
              hasPermission ? "" : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              if (hasPermission) {
                navigate(link);
                strNavTitle.value = title;
              }
            }}
          >
            <Typography
              as="span"
              variant="small"
              className={`text-[1vw] ${hasPermission ? "" : "text-gray-400"}`}
            >
              {title}
            </Typography>
            {renderSubMenu && renderSubMenu.length > 0 && (
              <Menu open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                  <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
                </MenuHandler>
                <MenuList className="p-1">{renderSubMenu}</MenuList>
              </Menu>
            )}
          </MenuItem>
        </div>
      );
    }
  );

  return (
    <div className="w-[15vw]">
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler onClick={toggleMenu}>
          <Typography as="a" href="#" variant="h4" className="text-[1vw]">
            <MenuItem
              // {...triggers}
              className="hidden items-center gap-2 font-menu lg:flex lg:rounded-full"
            >
              <FontAwesomeIcon icon={faWarehouse} size="xl" /> BODEGA{" "}
              <FontAwesomeIcon
                icon={faChevronDown}
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          // {...triggers}
          className="hidden w-[30vw]  grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <img className="imgNavBar" src={imagen}></img>
            {/* <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" /> */}
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            <Menu
              placement="right-start"
              open={openMenuKardexBodega}
              handler={setOpenMenuKardexBodega}
              allowHover
              offset={15}
            >
              <MenuHandler className="flex items-center justify-between">
                <MenuItem>
                  <Typography className="text-[1vw] w-[17vw] flex justify-between">
                    Kardex{" "}
                    <FontAwesomeIcon icon={faChevronRight} className="" />
                  </Typography>
                </MenuItem>
              </MenuHandler>
              <MenuList className="">
                {subMenuKardexBodega.map(({ title, id, link }) => {
                  const hasPermission = userPermission.includes(id as any);
                  return (
                    <MenuItem
                      className={`text-[1vw]  flex items-center gap-2 rounded ${
                        hasPermission ? "" : "text-gray-400 cursor-not-allowed"
                      }`}
                      key={id}
                      onClick={() => {
                        if (hasPermission) {
                          navigate(link);
                          strNavTitle.value = title;
                        }
                      }}
                    >
                      {title}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>

            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <FontAwesomeIcon icon={faWarehouse} /> BODEGA{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </div>
  );
}

function NavListMenuProyectos({
  userPermission,
}: {
  userPermission: string[];
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openMenuParametrizacion, setOpenMenuParametrizacion] =
    React.useState(false);
  const [openMenuOTMotivos, setOpenMenuOTMotivos] = React.useState(false);
  const [openMenuAsignacion, setopenMenuAsignacion] = useState(false);

  const navigate = useNavigate();

  // const triggers = {
  //   onMouseEnter: () => setIsMenuOpen(true),
  //   onMouseLeave: () => setIsMenuOpen(false),
  // };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderItems = navListMenuProyectos.map(
    ({ title, link, id, subMenu }: any) => {
      const hasPermission = userPermission.includes(id);

      const renderSubMenu = subMenu
        ? subMenu.map(
            ({
              title: subMenuTitle,
              link: subMenuLink,
              id: subMenuId,
            }: any) => {
              const subMenuHasPermission = userPermission.includes(subMenuId);
              return (
                <MenuItem
                  key={subMenuId}
                  className={`flex   left-[30rem] items-center gap-2 rounded ${
                    subMenuHasPermission
                      ? ""
                      : "text-gray-400 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (subMenuHasPermission) {
                      navigate(subMenuLink);
                      strNavTitle.value = subMenuTitle;
                    }
                  }}
                >
                  <Typography
                    as="span"
                    variant="small"
                    className={`text-[1vw] ${
                      subMenuHasPermission ? "" : "text-gray-400"
                    }`}
                  >
                    {subMenuTitle}
                  </Typography>
                </MenuItem>
              );
            }
          )
        : null;

      return (
        <React.Fragment key={id}>
          <MenuItem
            className={`flex items-center gap-2 rounded ${
              hasPermission ? "" : "text-gray-400 cursor-not-allowed"
            }`}
            onClick={() => {
              if (hasPermission) {
                navigate(link);
                strNavTitle.value = title;
              }
            }}
          >
            <Typography
              as="span"
              variant="small"
              className={`text-[1vw] ${hasPermission ? "" : "text-gray-400"}`}
            >
              {title}
            </Typography>
            {renderSubMenu && renderSubMenu.length > 0 && (
              <Menu open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                  <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3" />
                </MenuHandler>
                <MenuList className="p-1">{renderSubMenu}</MenuList>
              </Menu>
            )}
          </MenuItem>
        </React.Fragment>
      );
    }
  );

  return (
    <div className=" w-[15vw]">
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler onClick={toggleMenu}>
          <Typography as="a" href="#" variant="h4" className="text-[1vw]">
            <MenuItem
              // {...triggers}
              className="hidden items-center gap-2 font-menu lg:flex lg:rounded-full"
            >
              <FontAwesomeIcon icon={faWallet} size="xl" /> PROYECTOS{" "}
              <FontAwesomeIcon
                icon={faChevronDown}
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          // {...triggers}
          className="hidden w-[30vw] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <img className="imgNavBar" src={imagen}></img>
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            <Menu
              placement="right-start"
              open={openMenuParametrizacion}
              handler={setOpenMenuParametrizacion}
              allowHover
              offset={15}
            >
              <MenuHandler className="flex items-center justify-between">
                <MenuItem>
                  <Typography className="text-[1vw] w-[18vw] flex justify-between">
                    Parametrización{" "}
                    <FontAwesomeIcon icon={faChevronRight} className="" />
                  </Typography>
                </MenuItem>
              </MenuHandler>
              <MenuList>
                {subMenuParametrizacion.map(({ title, id, link }) => {
                  const hasPermission = userPermission.includes(id as any);
                  return (
                    <MenuItem
                      className={`flex text-[1vw] items-center gap-2 rounded ${
                        hasPermission ? "" : "text-gray-400 cursor-not-allowed"
                      }`}
                      key={id}
                      onClick={() => {
                        if (hasPermission) {
                          navigate(link);
                          strNavTitle.value = title;
                        }
                      }}
                    >
                      {title}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>

            <Menu
              placement="right-start"
              open={openMenuAsignacion}
              handler={setopenMenuAsignacion}
              allowHover
              offset={15}
            >
              <MenuHandler className="flex items-center justify-between">
                <MenuItem>
                  <Typography className="text-[1vw] w-[17vw] flex justify-between">
                    Asignación{" "}
                    <FontAwesomeIcon icon={faChevronRight} className="" />
                  </Typography>
                </MenuItem>
              </MenuHandler>
              <MenuList>
                {subMenuParametrizacionBodega.map(({ title, id, link }) => {
                  const hasPermission = userPermission.includes(id as any);
                  return (
                    <MenuItem
                      className={`flex text-[1vw] items-center gap-2 rounded ${
                        hasPermission ? "" : "text-gray-400 cursor-not-allowed"
                      }`}
                      key={id}
                      onClick={() => {
                        if (hasPermission) {
                          navigate(link);
                          strNavTitle.value = title;
                        }
                      }}
                    >
                      {title}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>

            <Menu
              placement="right-start"
              open={openMenuOTMotivos}
              handler={setOpenMenuOTMotivos}
              allowHover
              offset={15}
            >
              <MenuHandler className="flex items-center justify-between">
                <MenuItem>
                  <Typography className="text-[1vw] w-[18vw] flex justify-between">
                    Motivos de OT{" "}
                    <FontAwesomeIcon icon={faChevronRight} className="" />
                  </Typography>
                </MenuItem>
              </MenuHandler>
              <MenuList>
                {subMenuMotivosOT.map(({ title, id, link }) => {
                  const hasPermission = userPermission.includes(id as any);
                  return (
                    <MenuItem
                      className={`flex text-[1vw] items-center gap-2 rounded ${
                        hasPermission ? "" : "text-gray-400 cursor-not-allowed"
                      }`}
                      key={id}
                      onClick={() => {
                        if (hasPermission) {
                          navigate(link);
                          strNavTitle.value = title;
                        }
                      }}
                    >
                      {title}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Menu>

            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <FontAwesomeIcon icon={faWallet} /> PROYECTOS{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </div>
  );
}

function NavListMenuSistema({ userPermission }: { userPermission: string[] }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  // const triggers = {
  //   onMouseEnter: () => setIsMenuOpen(true),
  //   onMouseLeave: () => setIsMenuOpen(false),
  // };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderItems = navListMenuSistema.map(({ title, link, id }) => {
    const hasPermission = userPermission.includes(id as any);
    return (
      <MenuItem
        key={id}
        className={`flex items-center gap-2 rounded ${
          hasPermission ? "" : "text-gray-400 cursor-not-allowed"
        }`}
        onClick={() => {
          if (hasPermission) {
            navigate(link);
            strNavTitle.value = title;
          }
        }}
      >
        <Typography
          as="span"
          variant="small"
          className={`text-[1vw] ${hasPermission ? "" : "text-gray-400"}`}
        >
          {title}
        </Typography>
      </MenuItem>
    );
  });

  return (
    <div className="w-[15vw]">
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler onClick={toggleMenu}>
          <Typography as="a" href="#" variant="h4" className="text-[1vw]">
            <MenuItem
              // {...triggers}
              className="hidden items-center gap-2 font-menu lg:flex lg:rounded-full"
            >
              <FontAwesomeIcon icon={faGears} size="xl" /> SISTEMA{" "}
              <FontAwesomeIcon
                icon={faChevronDown}
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          // {...triggers}
          className="hidden w-[30vw] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <img className="imgNavBar" src={imagen}></img>
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <FontAwesomeIcon icon={faGears} /> SISTEMA{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </div>
  );
}

const NavList = React.memo(function NavList() {
  const [userPermission, setUserPermission] = React.useState<string[]>([]);
  const userState = useAppSelector((store: AppStore) => store.user);

  React.useEffect(() => {
    const permisosKey = () => {
      return userState?.permisos
        ? JSON.parse(userState?.permisos).map((permiso: any) =>
            permiso.id.toString()
          )
        : [];
    };
    // const numbersPermission = permisosKey.map((str) => parseInt(str, 10));
    setUserPermission(permisosKey);
  }, [userState]);

  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenuOT userPermission={userPermission} />
      <NavListMenuBodega userPermission={userPermission} />
      <NavListMenuProyectos userPermission={userPermission} />
      <NavListMenuSistema userPermission={userPermission} />
    </ul>
  );
});

export default function ComplexNavbar() {
  const userState = useAppSelector((store: AppStore) => store.user);
  const location = useLocation();
  const [_titulo, setTitulo] = useState("");
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const navigate = useNavigate();

  const toggleIsNavOpen = React.useCallback(
    () => setIsNavOpen((cur) => !cur),
    []
  );

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  React.useEffect(() => {
    const nuevoTitulo = location.pathname.split("/").pop();
    if (nuevoTitulo) {
      const tituloConPrimeraLetraMayuscula =
        nuevoTitulo.charAt(0).toUpperCase() + nuevoTitulo.slice(1);
      setTitulo(tituloConPrimeraLetraMayuscula || "");
    }
  }, [location]);

  React.useEffect(() => {
    document.title = strNavTitle.value || "Sistema Gestión de OT";
  }, [strNavTitle.value]);

  return (
    <>
      {userState?.nombre && (
        // <Navbar className=" mt-2 mx-auto max-w-screen-xl sm:scroll-mx-4  p-2 lg:rounded-full lg:pl-6 navBarBorder z-30 ">
        <Navbar className=" !mb-[10rem] mt-2 mx-auto w-[90%] sm:scroll-mx-4 sm:h-[18hv] h-[8vh]  p-2 lg:rounded-full lg:pl-6 navBarBorder z-30 ">
          <div className="relative mb-10 mx-auto flex h-full items-center text-blue-gray-900">
            <div className="w-[40%] ml-2 cursor-pointer mantenedor-titulo translate-y-[-1.4rem]">
              <Typography className="w-[15vw] !text-[1.1vw] h-[1vh] overflow ">
                {strNavTitle}
              </Typography>
            </div>
            <div className=" w-[45vw] absolute   top-2/4 left-[50%] hidden -translate-x-2/4 -translate-y-2/4 lg:block">
              <NavList />
            </div>
            <IconButton
              size="sm"
              color="blue-gray"
              variant="text"
              onClick={toggleIsNavOpen}
              className="ml-auto mr-2 lg:hidden"
            >
              <Bars2Icon className="h-6 w-6" />
            </IconButton>
            <div className="lg:block sm:hidden lg:absolute lg:top-[6%] lg:right-6 lg:w-[50%] lg:translate-y-[0.1vw] text-[1vw]">
              <ProfileMenu />
            </div>
          </div>
          <Collapse open={isNavOpen} className="!overflow-y-auto">
            <div className=" absolute -left-[15%] top-[10%] w-[65%]    lg:hidden">
              {/* <NavList /> */}
              <ProfileMenu />
            </div>
            <ul>
              <li
                onClick={() => {
                  navigate("/operativo");
                }}
              >
                Operativo
              </li>
            </ul>
          </Collapse>
        </Navbar>
      )}
    </>
  );
}
