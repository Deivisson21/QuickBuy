using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading;

namespace QuickBuy.Dominio.Entidades
{
    public abstract class  Entidade
    {
        private List<string> _mensagensValidacao { get; set; }

        protected  List<string> MensagemValidacao
        {
            get { return _mensagensValidacao ?? (_mensagensValidacao = new List<string>()); }
        }
        protected void LimparMensagem() {

            MensagemValidacao.Clear();
        } 

        public string ObterMensagemValidacao()
        {
            return string.Join(". ", MensagemValidacao);
        }

        public abstract void Validar();

        public bool EhValido 
        {
            get { return !MensagemValidacao.Any(); }
        }


    }
}
