// FRAGMENT SHADER

#version 330

in vec4 color;
out vec4 outColor;

uniform sampler2D texture0;
in vec2 texCoord0;

// Materials
uniform vec3 materialAmbient;
uniform vec3 materialDiffuse;
uniform vec3 materialSpecular;
uniform float shininess;

in vec4 position;
in vec3 normal;

uniform int light1On; 
uniform int light2On;

// View Matrix
uniform mat4 matrixView;

struct POINT
{
	vec3 position;
	vec3 diffuse;
	vec3 specular;
};
uniform POINT lightPoint1;
uniform POINT lightPoint2;

vec4 PointLight(POINT light)
{
	// Calculate Point Light
	vec4 color = vec4(0, 0, 0, 0);
	vec4 lightPosView = matrixView * vec4(light.position, 1.0);
	vec3 L = normalize((lightPosView.xyz - position.xyz));
	float NdotL = dot(normal, L);
	color += vec4(materialDiffuse * light.diffuse, 1.0) * max(NdotL, 0.0);

	vec3 V = normalize(-position.xyz);
	vec3 R = reflect(-L, normal);
	float RdotV = dot(R, V);
	color += vec4(materialSpecular * light.specular * pow(max(RdotV, 0.0), shininess), 1.0);

	return color;
}

void main(void) 
{
  outColor = color;
  outColor *= texture(texture0, texCoord0);
  if (light1On == 1) 
  {
        outColor += PointLight(lightPoint1);
  }
    
  if (light2On == 1) 
  {
        outColor += PointLight(lightPoint2);
  }
}
