<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl"
>
    <xsl:output method="html" indent="yes"/>
    <!--Set default params (for testing in VS)-->
    <xsl:param name="routeNum" select="'014'" />
    <xsl:param name="stopName" select="'Highbury'" />
    <!-- Template for the table -->
    <xsl:template match="/">
        <table id="ltcTable" style="border:1px solid black">
            <tr>
                <th style="border:1px solid black">Stop #</th>
                <th style="border:1px solid black">Stop Name</th>
                <th style="border:1px solid black">Longitude</th>
                <th style="border:1px solid black">Lattitude</th>
                <th style="border:1px solid black">Route Number(s)</th>
            </tr>
            <!-- first select all stop children of the root element -->
            <xsl:for-each select="//stop">
                <!-- Sort based on ID's -->
                <xsl:sort select="@id" data-type="number" order="ascending"/>
                <!-- Seems like this should require multiple conditions, but this if works perfectly  -->
                <xsl:if test="contains(routes, $routeNum) and contains(@name, $stopName)">
                    <tr>
                        <td style="border:1px solid black">
                            <xsl:value-of select="@id" />
                        </td>
                        <td style="border:1px solid black">
                            <xsl:value-of select="@name" />
                        </td>
                        <td style="border:1px solid black">
                            <xsl:value-of select="location/@longitude" />
                        </td>
                        <td style="border:1px solid black">
                            <xsl:value-of select="location/@lattitude" />
                        </td>
                        <td style="border:1px solid black">
                            <xsl:value-of select="routes" />
                        </td>
                    </tr>
                </xsl:if>
            </xsl:for-each>
        </table>
    </xsl:template>
</xsl:stylesheet>