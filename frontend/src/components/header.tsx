import logo from "../../src/assets/logo.svg"
import { NavLink } from "./nav-link"

export function Header() {
  return(
    <div className="flex items-center gap-5 py-2">
      <img src={logo} alt="Logo do pass.in" />

      <nav className="flex items-center gap-5">
        <div className="text-zinc-300">
          <NavLink href="/eventos">Eventos</NavLink>
        </div>

        <NavLink href="/participantes">Participantes</NavLink>
      </nav>
    </div>
  )
}