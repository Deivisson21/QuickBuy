using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class PedidoController : Controller
    {
        private readonly IPedidoRepositorio _PedidoRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;
        public PedidoController(IPedidoRepositorio PedidoRepositorio,
            IHttpContextAccessor httpContextAccessor, IHostingEnvironment hostingEnvironment)
        {
            _PedidoRepositorio = PedidoRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_PedidoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpGet("obterPedidosUsuario")]
        public IActionResult obterPedidosUsuario(int Id)
        {
            try
            {
                return Json(_PedidoRepositorio.Obter(Id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Pedido Pedido)
        {
            try
            {
                Pedido.Validar();

                if (!Pedido.EhValido)
                {
                    return BadRequest(Pedido.ObterMensagemValidacao());
                }

                if(Pedido.Id > 0)
                {
                    _PedidoRepositorio.Atualizar(Pedido);
                }
                else
                {
                    _PedidoRepositorio.Adicionar(Pedido);
                }

                return Ok(Pedido.Id);
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
                var Pedido = _PedidoRepositorio.ObterPorId(Id);

                if(Pedido != null)
                {
                    _PedidoRepositorio.remover(Pedido);
                    return Ok(_PedidoRepositorio.ObterTodos());
                }
                else
                {
                    return BadRequest("Pedido não encontrado");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost("deletar")]
        public IActionResult deletar([FromBody]Pedido Pedido)
        {
            try
            {
                var pro_deletar = _PedidoRepositorio.ObterPorId(Pedido.Id);

                if (pro_deletar != null)
                {
                    _PedidoRepositorio.remover(pro_deletar);
                    return Ok(_PedidoRepositorio.ObterTodos());
                }
                else
                {
                    return BadRequest("Pedido não encontrado");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }

}
