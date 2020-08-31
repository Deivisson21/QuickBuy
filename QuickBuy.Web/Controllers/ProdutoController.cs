using System;
using Microsoft.AspNetCore.Mvc;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProdutoController : Controller
    {
        private readonly IProdutoRepositorio _produtoRepositorio;
        public ProdutoController(IProdutoRepositorio produtoRepositorio)
        {
            _produtoRepositorio = produtoRepositorio;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_produtoRepositorio.ObterTodos());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] Produto produto)
        {
            try
            {
                _produtoRepositorio.Adicionar(produto);
                return Created("api/produto", produto);
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
                var produto = _produtoRepositorio.ObterPorId(Id);

                if(produto != null)
                {
                    _produtoRepositorio.remover(produto);
                    return Ok(_produtoRepositorio.ObterTodos());
                }
                else
                {
                    return BadRequest("Produto não encontrado");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }
}
