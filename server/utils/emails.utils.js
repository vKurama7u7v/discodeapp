// * ===== TEMPLATE DE EMAIL PARA ACTIVAR CUENTA ===== *
exports.activateEmail = (user, EMAIL_FROM, CLIENT_URL, token) => {
  const { first_name, last_name, email } = user;

  const emailData = {
    from: EMAIL_FROM,
    to: email,
    subject: "Activacion de tu Cuenta DisCode",
    html: `
    <!DOCTYPE html>
    <html
      lang="en"
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:v="urn:schemas-microsoft-com:vml"
    >
      <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <!--[if mso
          ]><xml
            ><o:OfficeDocumentSettings
              ><o:PixelsPerInch>96</o:PixelsPerInch
              ><o:AllowPNG /></o:OfficeDocumentSettings></xml
        ><![endif]-->
        <!--[if !mso]><!-->
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Cabin"
          rel="stylesheet"
          type="text/css"
        />
        <!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
          }

          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }

          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }

          p {
            line-height: inherit;
          }

          @media (max-width: 620px) {
            .icons-inner {
              text-align: center;
            }

            .icons-inner td {
              margin: 0 auto;
            }

            .row-content {
              width: 100% !important;
            }

            .image_block img.big {
              width: auto !important;
            }

            .column .border {
              display: none;
            }

            .stack .column {
              width: 100%;
              display: block;
            }
          }
        </style>
      </head>
      <body
        style="
          background-color: #d9dffa;
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        "
      >
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          class="nl-container"
          role="presentation"
          style="
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            background-color: #d9dffa;
          "
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-1"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #cfd6f4;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            color: #000000;
                            width: 600px;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 20px;
                                  padding-bottom: 0px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="image_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        width: 100%;
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                    >
                                      <div align="center" style="line-height: 10px">
                                        <img
                                          alt="Card Header with Border and Shadow Animated"
                                          class="big"
                                          src="https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/animated_header.gif?v=1648593816149"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                            width: 600px;
                                            max-width: 100%;
                                          "
                                          title="Card Header with Border and Shadow Animated"
                                          width="600"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-2"
                  role="presentation"
                  style="
                    mso-table-lspace: 0pt;
                    mso-table-rspace: 0pt;
                    background-color: #d9dffa;
                    background-image: url('https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/body_background_2.png?v=1648593815867');
                    background-position: center top;
                    background-repeat: repeat;
                  "
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            color: #000000;
                            width: 600px;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-left: 50px;
                                  padding-right: 50px;
                                  padding-top: 15px;
                                  padding-bottom: 15px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                            color: #506bec;
                                            line-height: 1.2;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: left;
                                            "
                                          >
                                            <strong
                                              ><span style="font-size: 38px"
                                                >ACTIVA TU CUENTA</span
                                              ></strong
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                            color: #40507a;
                                            line-height: 1.2;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                          "
                                        >
                                          <strong>¡Hola, ${first_name} ${last_name}!</strong>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 5px;
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-top: 5px;
                                      "
                                    >
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 25.2px;
                                            color: #40507a;
                                            line-height: 1.8;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                          "
                                        >
                                          ¿Qué esperas para activar tu cuenta?, Haz
                                          clic en el siguiente botón para activar tu
                                          cuenta DisCode.
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="image_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        width: 100%;
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                    >
                                      <div align="center" style="line-height: 10px">
                                        <img
                                          src="https://cdn.glitch.global/27131a37-2b0c-4505-85fd-e4cd33d55125/pixil-frame-0%20(11).png?v=1652564500562"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                            width: 275px;
                                            max-width: 100%;
                                          "
                                          title="Cody - DisCode"
                                          width="275"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="button_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        padding-bottom: 20px;
                                        padding-left: 10px;
                                        padding-right: 10px;
                                        padding-top: 20px;
                                        text-align: center;
                                      "
                                    >
                                      <div align="center">
                                        <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com/" style="height:48px;width:175px;v-text-anchor:middle;" arcsize="34%" stroke="false" fillcolor="#506bec"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:15px"><!
                                        [endif]--><a
                                          href="${CLIENT_URL}/users/activate/${token}"
                                          style="
                                            text-decoration: none;
                                            display: inline-block;
                                            color: #ffffff;
                                            background-color: #506bec;
                                            border-radius: 16px;
                                            width: auto;
                                            border-top: 0px solid TRANSPARENT;
                                            border-right: 0px solid TRANSPARENT;
                                            border-bottom: 0px solid TRANSPARENT;
                                            border-left: 0px solid TRANSPARENT;
                                            padding-top: 8px;
                                            padding-bottom: 8px;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                            text-align: center;
                                            mso-border-alt: none;
                                            word-break: keep-all;
                                          "
                                          target="_blank"
                                          ><span
                                            style="
                                              padding-left: 25px;
                                              padding-right: 20px;
                                              font-size: 15px;
                                              display: inline-block;
                                              letter-spacing: normal;
                                            "
                                            ><span
                                              style="
                                                font-size: 16px;
                                                line-height: 2;
                                                word-break: break-word;
                                                mso-line-height-alt: 32px;
                                              "
                                              ><span
                                                data-mce-style="font-size: 15px; line-height: 30px;"
                                                style="
                                                  font-size: 15px;
                                                  line-height: 30px;
                                                "
                                                ><strong
                                                  >ACTIVAR CUENTA<br /></strong></span></span></span
                                        ></a>
                                        <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                            color: #40507a;
                                            line-height: 1.2;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                          "
                                        >
                                          <p style="margin: 0; font-size: 14px; color: #506bec;">
                                            <a
                                              style="color: #506bec; text-decoration: none;"
                                              href="${CLIENT_URL}/users/activate/${token}"
                                              >${token}</a
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <br />
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                            color: #40507a;
                                            line-height: 1.2;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                          "
                                        >
                                          <p style="margin: 0; font-size: 14px">
                                            ¿No reconoces este mensaje?, Puedes
                                            ignorar este mensaje.
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-3"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            color: #000000;
                            width: 600px;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-top: 0px;
                                  padding-bottom: 5px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="0"
                                  cellspacing="0"
                                  class="image_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td
                                      style="
                                        width: 100%;
                                        padding-right: 0px;
                                        padding-left: 0px;
                                      "
                                    >
                                      <div align="center" style="line-height: 10px">
                                        <img
                                          alt="Card Bottom with Border and Shadow Image"
                                          class="big"
                                          src="https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/bottom_img.png?v=1648593816254"
                                          style="
                                            display: block;
                                            height: auto;
                                            border: 0;
                                            width: 600px;
                                            max-width: 100%;
                                          "
                                          title="Card Bottom with Border and Shadow Image"
                                          width="600"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table
                  align="center"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  class="row row-4"
                  role="presentation"
                  style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                  width="100%"
                >
                  <tbody>
                    <tr>
                      <td>
                        <table
                          align="center"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          class="row-content stack"
                          role="presentation"
                          style="
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                            color: #000000;
                            width: 600px;
                          "
                          width="600"
                        >
                          <tbody>
                            <tr>
                              <td
                                class="column column-1"
                                style="
                                  mso-table-lspace: 0pt;
                                  mso-table-rspace: 0pt;
                                  font-weight: 400;
                                  text-align: left;
                                  vertical-align: top;
                                  padding-left: 10px;
                                  padding-right: 10px;
                                  padding-top: 10px;
                                  padding-bottom: 20px;
                                  border-top: 0px;
                                  border-right: 0px;
                                  border-bottom: 0px;
                                  border-left: 0px;
                                "
                                width="100%"
                              >
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="social_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <table
                                        align="center"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        class="social-table"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                        "
                                        width="72px"
                                      >
                                        <tr>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://www.instagram.com/"
                                              target="_blank"
                                              ><img
                                                alt="Instagram"
                                                height="32"
                                                src="https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/instagram2x.png?v=1648593815867"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="instagram"
                                                width="32"
                                            /></a>
                                          </td>
                                          <td style="padding: 0 2px 0 2px">
                                            <a
                                              href="https://www.twitter.com/"
                                              target="_blank"
                                              ><img
                                                alt="Twitter"
                                                height="32"
                                                src="https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/twitter2x.png?v=1648593815867"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                                title="twitter"
                                                width="32"
                                            /></a>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                            color: #97a2da;
                                            line-height: 1.2;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              font-size: 14px;
                                              text-align: center;
                                            "
                                          >
                                            Este enlace caducará en las próximas 24
                                            horas.<br />Para generar un nuevo enlace
                                            de activación, visite:
                                            <a
                                              style="color: #506bec"
                                              href="${CLIENT_URL}/register"
                                              >DisCode</a
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  class="text_block"
                                  role="presentation"
                                  style="
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                    word-break: break-word;
                                  "
                                  width="100%"
                                >
                                  <tr>
                                    <td>
                                      <div style="font-family: sans-serif">
                                        <div
                                          style="
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                            color: #97a2da;
                                            line-height: 1.2;
                                            font-family: Helvetica Neue, Helvetica,
                                              Arial, sans-serif;
                                          "
                                        >
                                          <p
                                            style="
                                              margin: 0;
                                              text-align: center;
                                              font-size: 12px;
                                            "
                                          >
                                            <span style="font-size: 12px"
                                              >Copyright© 2022, DisCode.</span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End -->
      </body>
    </html>
    `,
  };

  return emailData;
};

// * ===== TEMPLATE DE EMAIL PARA RESTABLECER PASS ===== *
exports.forgotPasswordEmail = (user, EMAIL_FROM, CLIENT_URL, token) => {
  const { email } = user;
  const emailData = {
    from: EMAIL_FROM,
    to: email,
    subject: "Restablece tu Contraseña DisCode",
    html: `
        <!DOCTYPE html>
        <html
          lang="en"
          xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:v="urn:schemas-microsoft-com:vml"
        >
          <head>
            <title></title>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <meta content="width=device-width, initial-scale=1.0" name="viewport" />
            <!--[if mso
              ]><xml
                ><o:OfficeDocumentSettings
                  ><o:PixelsPerInch>96</o:PixelsPerInch
                  ><o:AllowPNG /></o:OfficeDocumentSettings></xml
            ><![endif]-->
            <!--[if !mso]><!-->
            <link
              href="https://fonts.googleapis.com/css?family=Open+Sans"
              rel="stylesheet"
              type="text/css"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Cabin"
              rel="stylesheet"
              type="text/css"
            />
            <!--<![endif]-->
            <style>
              * {
                box-sizing: border-box;
              }

              body {
                margin: 0;
                padding: 0;
              }

              a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: inherit !important;
              }

              #MessageViewBody a {
                color: inherit;
                text-decoration: none;
              }

              p {
                line-height: inherit;
              }

              @media (max-width: 620px) {
                .icons-inner {
                  text-align: center;
                }

                .icons-inner td {
                  margin: 0 auto;
                }

                .row-content {
                  width: 100% !important;
                }

                .image_block img.big {
                  width: auto !important;
                }

                .column .border {
                  display: none;
                }

                .stack .column {
                  width: 100%;
                  display: block;
                }
              }
            </style>
          </head>
          <body
            style="
              background-color: #d9dffa;
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: none;
              text-size-adjust: none;
            "
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              class="nl-container"
              role="presentation"
              style="
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                background-color: #d9dffa;
              "
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-1"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #cfd6f4;
                      "
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                color: #000000;
                                width: 600px;
                              "
                              width="600"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      padding-top: 20px;
                                      padding-bottom: 0px;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="image_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            width: 100%;
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                        >
                                          <div align="center" style="line-height: 10px">
                                            <img
                                              alt="Card Header with Border and Shadow Animated"
                                              class="big"
                                              src="https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/animated_header.gif?v=1648593816149"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                width: 600px;
                                                max-width: 100%;
                                              "
                                              title="Card Header with Border and Shadow Animated"
                                              width="600"
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-2"
                      role="presentation"
                      style="
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        background-color: #d9dffa;
                        background-image: url('https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/body_background_2.png?v=1648593815867');
                        background-position: center top;
                        background-repeat: repeat;
                      "
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                color: #000000;
                                width: 600px;
                              "
                              width="600"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      padding-left: 50px;
                                      padding-right: 50px;
                                      padding-top: 15px;
                                      padding-bottom: 15px;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="text_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div
                                              style="
                                                font-size: 14px;
                                                mso-line-height-alt: 16.8px;
                                                color: #506bec;
                                                line-height: 1.2;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                              "
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  font-size: 14px;
                                                  text-align: left;
                                                "
                                              >
                                                <strong
                                                  ><span
                                                    style="
                                                      font-size: 38px;
                                                      text-transform: uppercase;
                                                    "
                                                    >Olvidaste tu Contraseña?</span
                                                  ></strong
                                                >
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="text_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div
                                              style="
                                                font-size: 14px;
                                                mso-line-height-alt: 16.8px;
                                                color: #40507a;
                                                line-height: 1.2;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                              "
                                            >
                                              <strong>¡Hola, ${email}!</strong>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="text_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding-bottom: 5px;
                                            padding-left: 10px;
                                            padding-right: 10px;
                                            padding-top: 5px;
                                          "
                                        >
                                          <div style="font-family: sans-serif">
                                            <div
                                              style="
                                                font-size: 14px;
                                                mso-line-height-alt: 25.2px;
                                                color: #40507a;
                                                line-height: 1.8;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                              "
                                            >
                                              ¡Realizaste una solicitud para restablecer
                                              tu contraseña DisCode!, Haz clic en el
                                              siguiente botón para restablecer tu
                                              contraseña.
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="image_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            width: 100%;
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                        >
                                          <div align="center" style="line-height: 10px">
                                            <img
                                              src="https://cdn.glitch.global/27131a37-2b0c-4505-85fd-e4cd33d55125/pixil-frame-0%20(10).png?v=1652564501207"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                width: 275px;
                                                max-width: 100%;
                                              "
                                              title="Cody - DisCode"
                                              width="275"
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="button_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            padding-bottom: 20px;
                                            padding-left: 10px;
                                            padding-right: 10px;
                                            padding-top: 20px;
                                            text-align: center;
                                          "
                                        >
                                          <div align="center">
                                            <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com/" style="height:48px;width:175px;v-text-anchor:middle;" arcsize="34%" stroke="false" fillcolor="#506bec"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:15px"><!
                                            [endif]--><a
                                              href="${CLIENT_URL}/users/password/forget/${token}"
                                              style="
                                                text-decoration: none;
                                                display: inline-block;
                                                color: #ffffff;
                                                background-color: #506bec;
                                                border-radius: 16px;
                                                width: auto;
                                                border-top: 0px solid TRANSPARENT;
                                                border-right: 0px solid TRANSPARENT;
                                                border-bottom: 0px solid TRANSPARENT;
                                                border-left: 0px solid TRANSPARENT;
                                                padding-top: 8px;
                                                padding-bottom: 8px;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                                text-align: center;
                                                mso-border-alt: none;
                                                word-break: keep-all;
                                              "
                                              target="_blank"
                                              ><span
                                                style="
                                                  padding-left: 25px;
                                                  padding-right: 20px;
                                                  font-size: 15px;
                                                  display: inline-block;
                                                  letter-spacing: normal;
                                                "
                                                ><span
                                                  style="
                                                    font-size: 16px;
                                                    line-height: 2;
                                                    word-break: break-word;
                                                    mso-line-height-alt: 32px;
                                                  "
                                                  ><span
                                                    data-mce-style="font-size: 15px; line-height: 30px;"
                                                    style="
                                                      font-size: 15px;
                                                      line-height: 30px;
                                                    "
                                                    ><strong
                                                      >RESTABLECER CONTRASEÑA<br /></strong></span></span></span
                                            ></a>
                                            <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="text_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div
                                              style="
                                                font-size: 14px;
                                                mso-line-height-alt: 16.8px;
                                                color: #40507a;
                                                line-height: 1.2;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                              "
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  font-size: 14px;
                                                  color: #506bec;
                                                "
                                              >
                                                <a
                                                  style="
                                                    color: #506bec;
                                                    text-decoration: none;
                                                  "
                                                  href="${CLIENT_URL}/users/password/forget/${token}"
                                                  >${token}</a
                                                >
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <br />
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="text_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div
                                              style="
                                                font-size: 14px;
                                                mso-line-height-alt: 16.8px;
                                                color: #40507a;
                                                line-height: 1.2;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                              "
                                            >
                                              <p style="margin: 0; font-size: 14px">
                                                Si no realizó esta solicitud,
                                                simplemente ignore este mensaje.
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-3"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                color: #000000;
                                width: 600px;
                              "
                              width="600"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      padding-top: 0px;
                                      padding-bottom: 5px;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <table
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      class="image_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td
                                          style="
                                            width: 100%;
                                            padding-right: 0px;
                                            padding-left: 0px;
                                          "
                                        >
                                          <div align="center" style="line-height: 10px">
                                            <img
                                              alt="Card Bottom with Border and Shadow Image"
                                              class="big"
                                              src="https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/bottom_img.png?v=1648593816254"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                                width: 600px;
                                                max-width: 100%;
                                              "
                                              title="Card Bottom with Border and Shadow Image"
                                              width="600"
                                            />
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      class="row row-4"
                      role="presentation"
                      style="mso-table-lspace: 0pt; mso-table-rspace: 0pt"
                      width="100%"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              class="row-content stack"
                              role="presentation"
                              style="
                                mso-table-lspace: 0pt;
                                mso-table-rspace: 0pt;
                                color: #000000;
                                width: 600px;
                              "
                              width="600"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    class="column column-1"
                                    style="
                                      mso-table-lspace: 0pt;
                                      mso-table-rspace: 0pt;
                                      font-weight: 400;
                                      text-align: left;
                                      vertical-align: top;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 10px;
                                      padding-bottom: 20px;
                                      border-top: 0px;
                                      border-right: 0px;
                                      border-bottom: 0px;
                                      border-left: 0px;
                                    "
                                    width="100%"
                                  >
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="social_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td>
                                          <table
                                            align="center"
                                            border="0"
                                            cellpadding="0"
                                            cellspacing="0"
                                            class="social-table"
                                            role="presentation"
                                            style="
                                              mso-table-lspace: 0pt;
                                              mso-table-rspace: 0pt;
                                            "
                                            width="72px"
                                          >
                                            <tr>
                                              <td style="padding: 0 2px 0 2px">
                                                <a
                                                  href="https://www.instagram.com/"
                                                  target="_blank"
                                                  ><img
                                                    alt="Instagram"
                                                    height="32"
                                                    src="https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/instagram2x.png?v=1648593815867"
                                                    style="
                                                      display: block;
                                                      height: auto;
                                                      border: 0;
                                                    "
                                                    title="instagram"
                                                    width="32"
                                                /></a>
                                              </td>
                                              <td style="padding: 0 2px 0 2px">
                                                <a
                                                  href="https://www.twitter.com/"
                                                  target="_blank"
                                                  ><img
                                                    alt="Twitter"
                                                    height="32"
                                                    src="https://cdn.glitch.global/3f19fde5-a84b-463f-bb13-7b093147555d/twitter2x.png?v=1648593815867"
                                                    style="
                                                      display: block;
                                                      height: auto;
                                                      border: 0;
                                                    "
                                                    title="twitter"
                                                    width="32"
                                                /></a>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="text_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div
                                              style="
                                                font-size: 14px;
                                                mso-line-height-alt: 16.8px;
                                                color: #97a2da;
                                                line-height: 1.2;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                              "
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  font-size: 14px;
                                                  text-align: center;
                                                "
                                              >
                                                Este enlace caducará en los proximos 15
                                                minutos.<br />Para generar un nuevo
                                                enlace de recuperación de contraseña,
                                                visite:
                                                <a
                                                  style="color: #506bec"
                                                  href="${CLIENT_URL}/users/password/forget"
                                                  >DisCode</a
                                                >
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                    <table
                                      border="0"
                                      cellpadding="10"
                                      cellspacing="0"
                                      class="text_block"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0pt;
                                        mso-table-rspace: 0pt;
                                        word-break: break-word;
                                      "
                                      width="100%"
                                    >
                                      <tr>
                                        <td>
                                          <div style="font-family: sans-serif">
                                            <div
                                              style="
                                                font-size: 14px;
                                                mso-line-height-alt: 16.8px;
                                                color: #97a2da;
                                                line-height: 1.2;
                                                font-family: Helvetica Neue, Helvetica,
                                                  Arial, sans-serif;
                                              "
                                            >
                                              <p
                                                style="
                                                  margin: 0;
                                                  text-align: center;
                                                  font-size: 12px;
                                                "
                                              >
                                                <span style="font-size: 12px"
                                                  >Copyright© 2022, DisCode.</span
                                                >
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End -->
          </body>
        </html>

        `,
  };

  return emailData;
};
