using System;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class UsuarioController : Controller
    {
        private readonly IUsuarioRepositorio _usuarioRepositorio;
        public UsuarioController(IUsuarioRepositorio usuarioRepositorio)
        {
            _usuarioRepositorio = usuarioRepositorio;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_usuarioRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("VerificarUsuario")]
        public IActionResult VerificarUsuario([FromBody] Usuario usuario)
        {
            try
            {
                var usuarioRetorno = _usuarioRepositorio.Obter(usuario.Email, usuario.Senha);

                if (usuarioRetorno != null)
                {
                    return Ok(usuarioRetorno);
                }

                return BadRequest("Usuário Inválido");
               
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Usuario usuario)
        {
            try
            {
                var _usuario = _usuarioRepositorio.Obter(usuario.Email);

                if(_usuario != null)
                {
                    return BadRequest("Usuario já cadastrado no sistema!");
                }

                _usuarioRepositorio.Adicionar(usuario);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpDelete]
        public IActionResult Detele(int Id)
        {
            try
            {
                var usuario = _usuarioRepositorio.ObterPorId(Id);

                if(usuario != null)
                {
                    _usuarioRepositorio.remover(usuario);
                    return Ok(_usuarioRepositorio.ObterTodos());
                }
                else
                {
                    return BadRequest("usuario não encontrado");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
