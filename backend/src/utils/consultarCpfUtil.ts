import puppeteer from "puppeteer";

const consultarCPF = async (cpf: string) => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://portaldatransparencia.gov.br/servidores/consulta?ordenarPor=nome&direcao=asc"
  );

  await page.waitForSelector("#cookiebar-modal-footer-buttons");
  await page.waitForSelector("#accept-minimal-btn");
  await page.click("#accept-minimal-btn");

  await page.waitForSelector(".box-tabela-filtro__form-filtro");

  await page.waitForSelector("#btn-busca-livre-0");
  await page.click("#btn-busca-livre-0");

  await page.waitForSelector("#palavraChave");
  await page.type("#palavraChave", cpf, { delay: 100 });

  const botaoAdicionar = await page.waitForSelector(
    ".br-button.primary.btn-adicionar",
    { visible: true }
  );
  await botaoAdicionar?.hover();
  await new Promise((resolve) => setTimeout(resolve, 500));
  await botaoAdicionar?.click();

  await page.waitForSelector("#interactivetag1", {
    visible: true,
    timeout: 5000,
  });
  const botaoConsultar = await page.waitForSelector(
    ".btn-consultar.br-button.primary.btn-filtros-aplicados-consultar",
    {
      visible: true,
    }
  );
  await botaoConsultar?.click();

  await page.waitForSelector("table#lista tbody tr", {
    visible: true,
    timeout: 5000,
  });
  const linhaExiste = await page.$("table#lista tbody tr");
  if (!linhaExiste) {
    await browser.close();
    return;
  }

  const nenhumRegistro = await page.evaluate(() => {
    const td = document.querySelector(
      "table#lista tbody tr td.dataTables_empty"
    );
    return td?.textContent?.trim() === "Nenhum registro encontrado";
  });

  if (nenhumRegistro) {
    await browser.close();
    return null;
  }

  try {
    await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded" }),
      page.$eval(
        "table#lista tbody tr a.br-button.circle[aria-label='Detalhar']",
        (el) => {
          el.scrollIntoView();
          (el as HTMLElement).click();
        }
      ),
    ]);
  } catch (error) {
    console.log("Erro ao tentar clicar no botão Detalhar:", error);
  }

  await page.waitForSelector(
    'button[aria-controls="group-historico-poder-executivo"]',
    { visible: true }
  );
  await page.$eval(
    'button[aria-controls="group-historico-poder-executivo"]',
    (button) => {
      button.scrollIntoView();
      (button as HTMLElement).click();
    }
  );

  await page.waitForSelector("#tabela-historico-poder-executivo tbody");

  const tabelaDados = await page.$$eval(
    "#tabela-historico-poder-executivo tbody tr",
    (linhas) => {
      return linhas
        .map((linha) => {
          const colunas = linha.querySelectorAll("td");
          return Array.from(colunas).map(
            (coluna) => coluna.textContent?.trim() || ""
          );
        })
        .flat();
    }
  );

  await browser.close();

  return tabelaDados;
};

export default consultarCPF;
