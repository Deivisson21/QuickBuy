using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
using QuickBuy.Dominio.Contratos;
using QuickBuy.Dominio.Entidades;

namespace QuickBuy.Web.Controllers
{
    [Route("api/[controller]")]
    public class ProdutoController : Controller
    {
        private readonly IProdutoRepositorio _produtoRepositorio;
        private IHttpContextAccessor _httpContextAccessor;
        private IHostingEnvironment _hostingEnvironment;
        public ProdutoController(IProdutoRepositorio produtoRepositorio,
            IHttpContextAccessor httpContextAccessor, IHostingEnvironment hostingEnvironment)
        {
            _produtoRepositorio = produtoRepositorio;
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Json(_produtoRepositorio.ObterTodos());
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
                produto.Validar();

                if (!produto.EhValido)
                {
                    return BadRequest(produto.ObterMensagemValidacao());
                }

                if(produto.Id > 0)
                {
                    _produtoRepositorio.Atualizar(produto);
                }
                else
                {
                    _produtoRepositorio.Adicionar(produto);
                }
               
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

        [HttpPost("deletar")]
        public IActionResult deletar([FromBody]Produto produto)
        {
            try
            {
                var pro_deletar = _produtoRepositorio.ObterPorId(produto.Id);

                if (pro_deletar != null)
                {
                    _produtoRepositorio.remover(pro_deletar);
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

        [HttpPost("EnviarArquivo")]
        public IActionResult EnviarArquivo()
        {
            try
            {
                var FormFile = _httpContextAccessor.HttpContext.Request.Form.Files["arquivoEnviado"];
                var nome_arquivo = FormFile.FileName;
                var extensao = nome_arquivo.Split(".").Last();
                var arrayNomeCompacto = Path.GetFileNameWithoutExtension(nome_arquivo).Take(10).ToArray();
                
                var novoNomeArquivo = new string(arrayNomeCompacto).Replace(" ", "-")
                    + "_" + DateTime.Now.Year + DateTime.Now.Month + DateTime.Now.Day
                    + DateTime.Now.Minute + DateTime.Now.Second
                    + "." + extensao;

                var dir = _hostingEnvironment.WebRootPath + "\\arquivos\\"  ;
                var nomeCompleto = dir + novoNomeArquivo;

                using (var streamArquivo = new FileStream(nomeCompleto,FileMode.Create))
                {
                    FormFile.CopyTo(streamArquivo);
                }
                return Json(novoNomeArquivo);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.ToString());
            }
        }
    }

}
